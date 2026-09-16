#!/usr/bin/env python3
"""
Clip Studio Import Package Converter

This desktop tool converts PNG/JPEG/BMP/TIFF images into a safe Clip Studio
import package: a selected .clip/.csp/.csd wrapper containing structured chunks,
an embedded SQLite canvas metadata block, and a lossless TIFF payload that Clip
Studio Paint can import reliably.

Important: Clip Studio Paint's native .clip/.csp save format is proprietary.
This tool does not claim to generate an official editable Clip Studio document.
It creates a robust, inspectable package plus a companion TIFF for production
import workflows.
"""

from __future__ import annotations

import io
import os
import sqlite3
import struct
import sys
import tempfile
import threading
import traceback
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Iterable, Optional

try:
    from PIL import Image, ImageCms, ImageOps, TiffImagePlugin
except ImportError:  # Pillow is checked again in the GUI and CLI startup path.
    Image = None  # type: ignore[assignment]
    ImageCms = None  # type: ignore[assignment]
    ImageOps = None  # type: ignore[assignment]
    TiffImagePlugin = None  # type: ignore[assignment]

try:
    import tkinter as tk
    from tkinter import filedialog, messagebox, ttk
except ImportError as exc:
    raise SystemExit("Tkinter is required to run this desktop tool.") from exc

try:
    from tkinterdnd2 import DND_FILES, TkinterDnD
except ImportError:
    DND_FILES = None
    TkinterDnD = None


SUPPORTED_INPUTS = {".png", ".jpg", ".jpeg", ".bmp", ".tif", ".tiff"}
SUPPORTED_OUTPUTS = {".clip", ".csp", ".csd"}
APP_NAME = "Clip Studio Import Package Converter"
MAGIC = b"CSFCHUNK"
VERSION = 1


@dataclass(frozen=True)
class ConversionOptions:
    source_path: Path
    output_path: Path
    output_extension: str
    canvas_scale_percent: int
    dpi: int
    color_mode: str
    create_companion_tiff: bool = True


@dataclass(frozen=True)
class ImagePayload:
    image: "Image.Image"
    width: int
    height: int
    mode: str
    dpi: int
    tiff_bytes: bytes


class DependencyError(RuntimeError):
    pass


class ChunkWriter:
    """Writes simple big-endian chunks inside a CSFCHUNK-style wrapper."""

    def __init__(self) -> None:
        self._chunks: list[tuple[bytes, bytes]] = []

    def add(self, chunk_id: bytes, payload: bytes) -> None:
        if len(chunk_id) != 8:
            raise ValueError("chunk_id must be exactly 8 bytes")
        self._chunks.append((chunk_id, payload))

    def build(self) -> bytes:
        body = io.BytesIO()
        for chunk_id, payload in self._chunks:
            body.write(chunk_id)
            body.write(struct.pack(">Q", len(payload)))
            body.write(payload)
            padding = (-len(payload)) % 8
            if padding:
                body.write(b"\x00" * padding)

        body_bytes = body.getvalue()
        header = MAGIC + struct.pack(">I", VERSION) + struct.pack(">Q", len(body_bytes))
        footer_payload = struct.pack(">Q", len(header) + len(body_bytes)) + b"IDCRAFT-CSIMPORT"
        footer = b"CHNKFoot" + struct.pack(">Q", len(footer_payload)) + footer_payload
        return header + body_bytes + footer

    @staticmethod
    def validate(blob: bytes) -> None:
        if not blob.startswith(MAGIC):
            raise ValueError("Invalid package header")
        if b"CHNKSQLi" not in blob or b"CHNKPixl" not in blob or b"CHNKFoot" not in blob:
            raise ValueError("Missing required chunk")
        if len(blob) < 32:
            raise ValueError("Package is too small")


class ClipStudioPackageBuilder:
    def __init__(self, progress: Optional[Callable[[int, str], None]] = None) -> None:
        self.progress = progress or (lambda _value, _label: None)

    def convert(self, options: ConversionOptions) -> Path:
        if Image is None:
            raise DependencyError("Pillow is missing. Install it with: pip install pillow")

        source = options.source_path
        if not source.exists():
            raise FileNotFoundError(f"Input file not found: {source}")
        if source.suffix.lower() not in SUPPORTED_INPUTS:
            raise ValueError(f"Unsupported input format: {source.suffix}")

        output_path = self._normalized_output_path(options.output_path, options.output_extension)
        output_path.parent.mkdir(parents=True, exist_ok=True)

        self.progress(8, "Reading image")
        payload = self._prepare_image(options)

        self.progress(38, "Building SQLite canvas metadata")
        sqlite_bytes = self._build_sqlite_payload(options, payload)

        self.progress(58, "Packing binary chunks")
        package = self._build_package(options, payload, sqlite_bytes)
        ChunkWriter.validate(package)

        self.progress(76, "Writing package")
        self._atomic_write(output_path, package)

        if options.create_companion_tiff:
            self.progress(88, "Writing import TIFF")
            tiff_path = output_path.with_suffix(".import.tif")
            self._atomic_write(tiff_path, payload.tiff_bytes)

        self.progress(100, "Complete")
        return output_path

    def _normalized_output_path(self, output_path: Path, extension: str) -> Path:
        extension = extension.lower()
        if extension not in SUPPORTED_OUTPUTS:
            raise ValueError(f"Unsupported output extension: {extension}")
        if output_path.suffix.lower() != extension:
            return output_path.with_suffix(extension)
        return output_path

    def _prepare_image(self, options: ConversionOptions) -> ImagePayload:
        assert Image is not None
        with Image.open(options.source_path) as original:
            image = ImageOps.exif_transpose(original)
            image.load()

        image = self._normalize_color(image, options.color_mode)
        if options.canvas_scale_percent != 100:
            scale = max(10, min(400, options.canvas_scale_percent)) / 100
            next_size = (max(1, round(image.width * scale)), max(1, round(image.height * scale)))
            resampling = getattr(Image.Resampling, "LANCZOS", Image.LANCZOS)
            image = image.resize(next_size, resampling)

        tiff_bytes = self._encode_tiff(image, options.dpi)
        return ImagePayload(
            image=image,
            width=image.width,
            height=image.height,
            mode=image.mode,
            dpi=options.dpi,
            tiff_bytes=tiff_bytes,
        )

    def _normalize_color(self, image: "Image.Image", color_mode: str) -> "Image.Image":
        if image.mode == "CMYK":
            image = self._convert_cmyk_to_rgb(image)
        elif image.mode in {"P", "1", "I", "F", "LA"}:
            image = image.convert("RGBA")

        if color_mode == "Gray":
            return image.convert("L")
        if color_mode == "Monochromatic":
            gray = image.convert("L")
            return gray.point(lambda pixel: 255 if pixel > 127 else 0, mode="1")
        if image.mode not in {"RGBA", "RGB", "L", "1"}:
            return image.convert("RGBA")
        if image.mode == "RGB" and "transparency" in image.info:
            return image.convert("RGBA")
        return image

    def _convert_cmyk_to_rgb(self, image: "Image.Image") -> "Image.Image":
        if ImageCms is None:
            return image.convert("RGB")
        try:
            srgb = ImageCms.createProfile("sRGB")
            cmyk = ImageCms.createProfile("CMYK")
            return ImageCms.profileToProfile(image, cmyk, srgb, outputMode="RGB")
        except Exception:
            return image.convert("RGB")

    def _encode_tiff(self, image: "Image.Image", dpi: int) -> bytes:
        if TiffImagePlugin is None:
            raise DependencyError("Pillow TIFF support is unavailable.")
        output = io.BytesIO()
        save_kwargs = {
            "format": "TIFF",
            "compression": "tiff_lzw",
            "dpi": (dpi, dpi),
            "software": APP_NAME,
            "description": "Lossless Clip Studio import asset generated by IDCraft tooling.",
        }
        if image.mode == "1":
            save_image = image
        elif image.mode in {"RGB", "RGBA", "L"}:
            save_image = image
        else:
            save_image = image.convert("RGBA")
        save_image.save(output, **save_kwargs)
        data = output.getvalue()
        if len(data) % 2 != 0:
            data += b"\x00"
        return data

    def _build_sqlite_payload(self, options: ConversionOptions, payload: ImagePayload) -> bytes:
        database = sqlite3.connect(":memory:")
        try:
            database.executescript(
                """
                PRAGMA user_version = 1;
                CREATE TABLE document (
                    id INTEGER PRIMARY KEY,
                    app_name TEXT NOT NULL,
                    source_path TEXT NOT NULL,
                    output_extension TEXT NOT NULL,
                    width INTEGER NOT NULL,
                    height INTEGER NOT NULL,
                    dpi INTEGER NOT NULL,
                    color_mode TEXT NOT NULL,
                    created_by TEXT NOT NULL
                );
                CREATE TABLE layers (
                    id INTEGER PRIMARY KEY,
                    parent_id INTEGER,
                    name TEXT NOT NULL,
                    kind TEXT NOT NULL,
                    blend_mode TEXT NOT NULL,
                    opacity REAL NOT NULL,
                    visible INTEGER NOT NULL,
                    width INTEGER NOT NULL,
                    height INTEGER NOT NULL,
                    pixel_payload_chunk TEXT NOT NULL
                );
                CREATE TABLE metadata (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL
                );
                """
            )
            database.execute(
                """
                INSERT INTO document (
                    app_name, source_path, output_extension, width, height, dpi,
                    color_mode, created_by
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    "Clip Studio Paint Import Package",
                    str(options.source_path),
                    options.output_extension,
                    payload.width,
                    payload.height,
                    payload.dpi,
                    payload.mode,
                    APP_NAME,
                ),
            )
            database.execute(
                """
                INSERT INTO layers (
                    parent_id, name, kind, blend_mode, opacity, visible, width,
                    height, pixel_payload_chunk
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (None, "Flattened Raster Layer", "raster", "normal", 1.0, 1, payload.width, payload.height, "CHNKPixl"),
            )
            database.executemany(
                "INSERT INTO metadata (key, value) VALUES (?, ?)",
                [
                    ("dpi", str(payload.dpi)),
                    ("canvas_scale_percent", str(options.canvas_scale_percent)),
                    ("alpha_preserved", str(payload.image.mode == "RGBA")),
                    ("native_clip_warning", "Official .clip/.csp writing is proprietary; use companion TIFF for Clip Studio import."),
                ],
            )
            database.commit()

            backup = io.BytesIO()
            for line in database.iterdump():
                backup.write((line + "\n").encode("utf-8"))

            sqlite_file = tempfile.NamedTemporaryFile(delete=False, suffix=".sqlite")
            sqlite_file.close()
            try:
                disk_db = sqlite3.connect(sqlite_file.name)
                database.backup(disk_db)
                disk_db.close()
                return Path(sqlite_file.name).read_bytes()
            finally:
                try:
                    os.unlink(sqlite_file.name)
                except OSError:
                    pass
        finally:
            database.close()

    def _build_package(self, options: ConversionOptions, payload: ImagePayload, sqlite_bytes: bytes) -> bytes:
        head = "\n".join(
            [
                "Clip Studio Paint import package",
                f"extension={options.output_extension}",
                f"width={payload.width}",
                f"height={payload.height}",
                f"dpi={payload.dpi}",
                f"mode={payload.mode}",
                "payload=lossless_tiff",
            ]
        ).encode("utf-8")

        writer = ChunkWriter()
        writer.add(b"CHNKHead", head)
        writer.add(b"CHNKSQLi", sqlite_bytes)
        writer.add(b"CHNKPixl", payload.tiff_bytes)
        return writer.build()

    def _atomic_write(self, path: Path, data: bytes) -> None:
        temp_path = path.with_suffix(path.suffix + ".tmp")
        with open(temp_path, "wb") as handle:
            handle.write(data)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temp_path, path)


class ConverterApp:
    def __init__(self) -> None:
        root_class = TkinterDnD.Tk if TkinterDnD else tk.Tk
        self.root = root_class()
        self.root.title(APP_NAME)
        self.root.geometry("860x620")
        self.root.minsize(760, 560)

        self.source_path = tk.StringVar()
        self.output_path = tk.StringVar()
        self.extension = tk.StringVar(value=".clip")
        self.color_mode = tk.StringVar(value="RGB Color")
        self.canvas_scale = tk.IntVar(value=100)
        self.dpi = tk.IntVar(value=300)
        self.status = tk.StringVar(value="Select an image to begin.")
        self.progress = tk.IntVar(value=0)
        self.companion_tiff = tk.BooleanVar(value=True)

        self._build_style()
        self._build_ui()

    def run(self) -> None:
        self.root.mainloop()

    def _build_style(self) -> None:
        style = ttk.Style(self.root)
        try:
            style.theme_use("clam")
        except tk.TclError:
            pass
        self.root.configure(bg="#f3f0e8")
        style.configure("TFrame", background="#f3f0e8")
        style.configure("Card.TFrame", background="#fffdf7", relief="flat")
        style.configure("TLabel", background="#f3f0e8", foreground="#14213d")
        style.configure("Card.TLabel", background="#fffdf7", foreground="#14213d")
        style.configure("Title.TLabel", font=("Segoe UI", 22, "bold"), background="#f3f0e8", foreground="#102a43")
        style.configure("Hint.TLabel", font=("Segoe UI", 10), background="#f3f0e8", foreground="#607089")
        style.configure("TButton", font=("Segoe UI", 10, "bold"), padding=10)
        style.configure("Accent.TButton", font=("Segoe UI", 11, "bold"), padding=12)
        style.configure("Horizontal.TProgressbar", troughcolor="#ded8cc", background="#0f7b5f")

    def _build_ui(self) -> None:
        outer = ttk.Frame(self.root, padding=28)
        outer.pack(fill="both", expand=True)

        ttk.Label(outer, text="Clip Studio Image Converter", style="Title.TLabel").pack(anchor="w")
        ttk.Label(
            outer,
            text="Build a structured .clip/.csp/.csd import package and a lossless TIFF for native Clip Studio import.",
            style="Hint.TLabel",
        ).pack(anchor="w", pady=(4, 20))

        main = ttk.Frame(outer)
        main.pack(fill="both", expand=True)
        main.columnconfigure(0, weight=1)
        main.columnconfigure(1, weight=1)

        left = ttk.Frame(main, style="Card.TFrame", padding=18)
        left.grid(row=0, column=0, sticky="nsew", padx=(0, 12))
        right = ttk.Frame(main, style="Card.TFrame", padding=18)
        right.grid(row=0, column=1, sticky="nsew", padx=(12, 0))

        self.drop_zone = tk.Label(
            left,
            text="Drop image here\nor choose a file",
            bg="#e7f7ef",
            fg="#0f7b5f",
            font=("Segoe UI", 16, "bold"),
            relief="flat",
            padx=24,
            pady=48,
            cursor="hand2",
        )
        self.drop_zone.pack(fill="x")
        self.drop_zone.bind("<Button-1>", lambda _event: self.choose_source())

        if TkinterDnD and DND_FILES:
            self.drop_zone.drop_target_register(DND_FILES)
            self.drop_zone.dnd_bind("<<Drop>>", self._handle_drop)

        ttk.Button(left, text="Choose Image", command=self.choose_source).pack(fill="x", pady=(18, 8))
        ttk.Button(left, text="Choose Output Location", command=self.choose_output).pack(fill="x", pady=8)
        self._path_label(left, "Input", self.source_path)
        self._path_label(left, "Output", self.output_path)

        self._option_menu(right, "Target extension", self.extension, sorted(SUPPORTED_OUTPUTS))
        self._option_menu(right, "Color expression", self.color_mode, ["RGB Color", "Gray", "Monochromatic"])
        self._slider(right, "Canvas size", self.canvas_scale, 10, 400, "%")
        self._slider(right, "Resolution", self.dpi, 72, 1200, " DPI")

        ttk.Checkbutton(
            right,
            text="Create companion .import.tif for Clip Studio import",
            variable=self.companion_tiff,
        ).pack(anchor="w", pady=(14, 8))

        ttk.Button(right, text="Convert", style="Accent.TButton", command=self.start_conversion).pack(fill="x", pady=(18, 10))
        ttk.Progressbar(right, variable=self.progress, maximum=100).pack(fill="x", pady=(8, 10))
        ttk.Label(right, textvariable=self.status, style="Card.TLabel", wraplength=330).pack(anchor="w", pady=(4, 0))

        if Image is None:
            self.status.set("Pillow is missing. Run: pip install pillow")

    def _path_label(self, parent: ttk.Frame, label: str, variable: tk.StringVar) -> None:
        ttk.Label(parent, text=label, style="Card.TLabel", font=("Segoe UI", 9, "bold")).pack(anchor="w", pady=(14, 2))
        ttk.Label(parent, textvariable=variable, style="Card.TLabel", wraplength=340).pack(anchor="w")

    def _option_menu(self, parent: ttk.Frame, label: str, variable: tk.StringVar, values: Iterable[str]) -> None:
        ttk.Label(parent, text=label, style="Card.TLabel", font=("Segoe UI", 10, "bold")).pack(anchor="w", pady=(0, 6))
        ttk.OptionMenu(parent, variable, variable.get(), *values).pack(fill="x", pady=(0, 16))

    def _slider(self, parent: ttk.Frame, label: str, variable: tk.IntVar, from_: int, to: int, suffix: str) -> None:
        row = ttk.Frame(parent, style="Card.TFrame")
        row.pack(fill="x", pady=(2, 4))
        ttk.Label(row, text=label, style="Card.TLabel", font=("Segoe UI", 10, "bold")).pack(side="left")
        value_label = ttk.Label(row, text=f"{variable.get()}{suffix}", style="Card.TLabel")
        value_label.pack(side="right")

        def update(value: str) -> None:
            variable.set(round(float(value)))
            value_label.configure(text=f"{variable.get()}{suffix}")

        ttk.Scale(parent, from_=from_, to=to, variable=variable, command=update).pack(fill="x", pady=(0, 16))

    def _handle_drop(self, event: object) -> None:
        data = getattr(event, "data", "")
        paths = self.root.tk.splitlist(data)
        if paths:
            self.set_source(Path(paths[0]))

    def choose_source(self) -> None:
        filename = filedialog.askopenfilename(
            title="Choose source image",
            filetypes=[
                ("Images", "*.png *.jpg *.jpeg *.bmp *.tif *.tiff"),
                ("All files", "*.*"),
            ],
        )
        if filename:
            self.set_source(Path(filename))

    def set_source(self, path: Path) -> None:
        if path.suffix.lower() not in SUPPORTED_INPUTS:
            messagebox.showerror(APP_NAME, f"Unsupported input format: {path.suffix}")
            return
        self.source_path.set(str(path))
        default_output = path.with_suffix(self.extension.get())
        self.output_path.set(str(default_output))
        self.status.set(f"Ready: {path.name}")

    def choose_output(self) -> None:
        source = Path(self.source_path.get()) if self.source_path.get() else Path.home() / "converted.clip"
        filename = filedialog.asksaveasfilename(
            title="Choose output file",
            initialfile=source.with_suffix(self.extension.get()).name,
            defaultextension=self.extension.get(),
            filetypes=[
                ("Clip Studio package", "*.clip"),
                ("Clip Studio package", "*.csp"),
                ("Clip Studio metadata", "*.csd"),
                ("All files", "*.*"),
            ],
        )
        if filename:
            self.output_path.set(str(Path(filename).with_suffix(self.extension.get())))

    def start_conversion(self) -> None:
        if Image is None:
            messagebox.showerror(APP_NAME, "Pillow is missing. Install it with: pip install pillow")
            return
        if not self.source_path.get():
            messagebox.showerror(APP_NAME, "Please choose an input image first.")
            return
        if not self.output_path.get():
            messagebox.showerror(APP_NAME, "Please choose an output location.")
            return

        options = ConversionOptions(
            source_path=Path(self.source_path.get()),
            output_path=Path(self.output_path.get()),
            output_extension=self.extension.get(),
            canvas_scale_percent=self.canvas_scale.get(),
            dpi=self.dpi.get(),
            color_mode=self.color_mode.get(),
            create_companion_tiff=self.companion_tiff.get(),
        )
        self.progress.set(0)
        self.status.set("Starting conversion...")
        thread = threading.Thread(target=self._run_conversion, args=(options,), daemon=True)
        thread.start()

    def _run_conversion(self, options: ConversionOptions) -> None:
        builder = ClipStudioPackageBuilder(progress=self._set_progress)
        try:
            output = builder.convert(options)
            self.root.after(0, lambda: self._conversion_success(output))
        except Exception as exc:
            details = traceback.format_exc()
            self.root.after(0, lambda: self._conversion_failed(exc, details))

    def _set_progress(self, value: int, label: str) -> None:
        self.root.after(0, lambda: (self.progress.set(value), self.status.set(label)))

    def _conversion_success(self, output: Path) -> None:
        self.progress.set(100)
        self.status.set(f"Created {output.name}")
        messagebox.showinfo(APP_NAME, f"Conversion complete:\n{output}")

    def _conversion_failed(self, exc: Exception, details: str) -> None:
        self.progress.set(0)
        self.status.set(str(exc))
        print(details, file=sys.stderr)
        messagebox.showerror(APP_NAME, str(exc))


def main() -> None:
    app = ConverterApp()
    app.run()


if __name__ == "__main__":
    main()
