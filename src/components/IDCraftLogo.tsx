import React from 'react';

export type LogoVariant = 'horizontal' | 'stacked' | 'icon' | 'circle';
export type LogoTheme = 'color' | 'monochrome' | 'white';

interface IDCraftLogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
  onClick?: () => void;
}

/**
 * IDCraft India - Master Vector Brand Logo
 * 
 * Geometry:
 * 1. ID Card Silhouette: Standard ID-1 proportions with rounded corners.
 * 2. Lanyard Slot Notch: Punched slot at top-center via negative space.
 * 3. Security Shield Contour: Bottom curves into a protective shield.
 * 4. Emerald Quality Checkmark: Dynamic verification checkmark with 2.5px negative space gap.
 * 5. Clean Sans-serif Typography: "IDCraft" (Inter Bold 700) + "India" (Inter Medium 500).
 */
export const IDCraftLogoSymbol: React.FC<{
  theme?: LogoTheme;
  size?: number;
  className?: string;
}> = ({ theme = 'color', size = 40, className = '' }) => {
  const primaryColor = theme === 'color' ? '#2563EB' : theme === 'white' ? '#FFFFFF' : '#0F172A';
  const accentColor = theme === 'color' ? '#22C55E' : theme === 'white' ? '#FFFFFF' : '#0F172A';
  const maskBg = '#FFFFFF';
  const maskCutout = '#000000';

  // Unique ID for SVG mask to avoid DOM conflicts when multiple logos render
  const maskId = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="IDCraft India Logo Icon"
    >
      <defs>
        <mask id={`idcraft-mask-${maskId}`}>
          {/* Base white fills the entire mask */}
          <rect width="48" height="48" fill={maskBg} />
          
          {/* Lanyard punch slot (cutout) */}
          <rect x="19.5" y="8" width="9" height="3" rx="1.5" fill={maskCutout} />
          
          {/* Negative space channel around the security checkmark */}
          <path
            d="M17.5 25.5L22.5 30.5L32.5 18.5"
            stroke={maskCutout}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>
      </defs>

      {/* Lanyard Top Loop Bracket (Slightly tapered modern strap clip) */}
      <path
        d="M20 5C20 3.34315 21.3431 2 23 2H25C26.6569 2 28 3.34315 28 5V7H20V5Z"
        fill={primaryColor}
        opacity={theme === 'color' ? 0.9 : 0.8}
      />
      <circle cx="24" cy="4" r="1" fill={theme === 'white' ? '#0F172A' : '#FFFFFF'} />

      {/* Main Hybrid Body: ID Card + Security Shield with Masked Cutouts */}
      <path
        d="M11 9C11 6.79086 12.7909 5 15 5H33C35.2091 5 37 6.79086 37 9V26C37 34.5 24 43 24 43C24 43 11 34.5 11 26V9Z"
        fill={primaryColor}
        mask={`url(#idcraft-mask-${maskId})`}
      />

      {/* Minimal ID Badge Photo & Chip Negative Space Silhouette */}
      <rect
        x="15"
        y="14"
        width="6.5"
        height="7.5"
        rx="1.5"
        fill={theme === 'white' ? '#0F172A' : '#FFFFFF'}
        opacity={theme === 'white' ? 0.4 : 0.85}
      />
      <rect
        x="24"
        y="15"
        width="7"
        height="2"
        rx="1"
        fill={theme === 'white' ? '#0F172A' : '#FFFFFF'}
        opacity={theme === 'white' ? 0.4 : 0.85}
      />
      <rect
        x="24"
        y="19"
        width="5"
        height="2"
        rx="1"
        fill={theme === 'white' ? '#0F172A' : '#FFFFFF'}
        opacity={theme === 'white' ? 0.4 : 0.85}
      />

      {/* Verified Quality Security Checkmark (Emerald Green #22C55E or Monochrome) */}
      <path
        d="M17.5 25.5L22.5 30.5L32.5 18.5"
        stroke={accentColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const IDCraftLogo: React.FC<IDCraftLogoProps> = ({
  variant = 'horizontal',
  theme = 'color',
  size = 'md',
  className = '',
  showTagline = false,
  onClick,
}) => {
  // Pixel sizing scales
  const sizeMap = {
    xs: { icon: 26, text: 'text-[15px]', subtext: 'text-[10px]', gap: 'gap-2' },
    sm: { icon: 32, text: 'text-[17px]', subtext: 'text-[11px]', gap: 'gap-2.5' },
    md: { icon: 40, text: 'text-[20px]', subtext: 'text-[11px]', gap: 'gap-3' },
    lg: { icon: 48, text: 'text-[24px]', subtext: 'text-[12px]', gap: 'gap-3.5' },
    xl: { icon: 60, text: 'text-[30px]', subtext: 'text-[14px]', gap: 'gap-4' },
  };

  const currentSize = sizeMap[size];

  const primaryTextColor =
    theme === 'white' ? 'text-white' : theme === 'monochrome' ? 'text-[#0F172A]' : 'text-[#0F172A]';
  const subtextColor =
    theme === 'white' ? 'text-slate-400' : 'text-[#64748B]';
  const indiaTextColor =
    theme === 'white'
      ? 'text-slate-200'
      : theme === 'monochrome'
      ? 'text-[#334155]'
      : 'text-[#2563EB]';

  // 1. Circular Favicon / Symbol Only
  if (variant === 'circle') {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center justify-center rounded-full ${
          theme === 'white'
            ? 'bg-slate-900 border border-slate-700'
            : theme === 'monochrome'
            ? 'bg-slate-100 border border-slate-300'
            : 'bg-blue-50/80 border border-blue-100'
        } ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''} ${className}`}
        style={{
          width: currentSize.icon + 16,
          height: currentSize.icon + 16,
        }}
        title="IDCraft India Favicon"
      >
        <IDCraftLogoSymbol theme={theme} size={currentSize.icon} />
      </div>
    );
  }

  // 2. Icon Only
  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${
          onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''
        } ${className}`}
      >
        <IDCraftLogoSymbol theme={theme} size={currentSize.icon} />
      </div>
    );
  }

  // 3. Stacked Variation (for headers, square formats, print stamps)
  if (variant === 'stacked') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center text-center ${
          onClick ? 'cursor-pointer group' : ''
        } ${className}`}
      >
        <div className="mb-2">
          <IDCraftLogoSymbol theme={theme} size={currentSize.icon + 8} />
        </div>
        <div>
          <div className={`font-bold tracking-[-0.025em] ${currentSize.text} ${primaryTextColor} leading-tight`}>
            <span>IDCraft</span>{' '}
            <span className={`font-medium ${indiaTextColor}`}>India</span>
          </div>
          {showTagline && (
            <p className={`font-normal ${currentSize.subtext} ${subtextColor} tracking-wide mt-1`}>
              B2B ID Card Manufacturing
            </p>
          )}
        </div>
      </div>
    );
  }

  // 4. Horizontal Variation (Standard Header / Corporate Navbar)
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center ${currentSize.gap} select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <IDCraftLogoSymbol theme={theme} size={currentSize.icon} />
      <div className="flex flex-col text-left whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-[-0.02em] ${currentSize.text} ${primaryTextColor} leading-tight`}>
            IDCraft
          </span>
          <span className={`font-medium tracking-[-0.01em] ${currentSize.text} ${indiaTextColor} leading-tight`}>
            India
          </span>
        </div>
        {showTagline ? (
          <span className={`font-normal ${currentSize.subtext} ${subtextColor} tracking-wide mt-0.5`}>
            B2B Identity Card Manufacturing
          </span>
        ) : (
          <span className={`font-normal ${currentSize.subtext} ${subtextColor} tracking-wide`}>
            Institutional Identity Cards
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Generates raw standalone SVG string for export / download / clipboard
 */
export function getStandaloneLogoSvg(
  variant: 'horizontal' | 'stacked' | 'icon' | 'circle',
  theme: 'color' | 'monochrome'
): string {
  const isColor = theme === 'color';
  const primary = isColor ? '#2563EB' : '#0F172A';
  const accent = isColor ? '#22C55E' : '#0F172A';
  const textDark = '#0F172A';
  const textSecondary = isColor ? '#2563EB' : '#334155';

  const iconSvgContent = `
    <!-- Lanyard Clip Bracket -->
    <path d="M20 5C20 3.34315 21.3431 2 23 2H25C26.6569 2 28 3.34315 28 5V7H20V5Z" fill="${primary}" opacity="${isColor ? '0.9' : '0.8'}"/>
    <circle cx="24" cy="4" r="1" fill="#FFFFFF"/>

    <!-- Mask Definitions for Lanyard Punch & Checkmark Negative Space -->
    <mask id="idcraft-export-mask">
      <rect width="48" height="48" fill="#FFFFFF"/>
      <rect x="19.5" y="8" width="9" height="3" rx="1.5" fill="#000000"/>
      <path d="M17.5 25.5L22.5 30.5L32.5 18.5" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </mask>

    <!-- Card Body + Security Shield -->
    <path d="M11 9C11 6.79086 12.7909 5 15 5H33C35.2091 5 37 6.79086 37 9V26C37 34.5 24 43 24 43C24 43 11 34.5 11 26V9Z" fill="${primary}" mask="url(#idcraft-export-mask)"/>

    <!-- ID Card Photo & Chip Silhouette -->
    <rect x="15" y="14" width="6.5" height="7.5" rx="1.5" fill="#FFFFFF" opacity="0.85"/>
    <rect x="24" y="15" width="7" height="2" rx="1" fill="#FFFFFF" opacity="0.85"/>
    <rect x="24" y="19" width="5" height="2" rx="1" fill="#FFFFFF" opacity="0.85"/>

    <!-- Security Checkmark -->
    <path d="M17.5 25.5L22.5 30.5L32.5 18.5" stroke="${accent}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  `;

  if (variant === 'icon') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
${iconSvgContent}
</svg>`;
  }

  if (variant === 'circle') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <circle cx="32" cy="32" r="30" fill="${isColor ? '#EFF6FF' : '#F1F5F9'}" stroke="${isColor ? '#DBEAFE' : '#E2E8F0'}" stroke-width="2"/>
  <g transform="translate(8, 8)">
${iconSvgContent}
  </g>
</svg>`;
  }

  if (variant === 'stacked') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200" height="120" fill="none">
  <g transform="translate(76, 10)">
${iconSvgContent}
  </g>
  <text x="100" y="85" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="700" fill="${textDark}" letter-spacing="-0.5">IDCraft <tspan font-weight="500" fill="${textSecondary}">India</tspan></text>
  <text x="100" y="102" text-anchor="middle" font-family="Inter, -apple-system, sans-serif" font-size="9" font-weight="400" fill="#64748B" letter-spacing="0.5">B2B ID CARD MANUFACTURING</text>
</svg>`;
  }

  // Horizontal (Default)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 56" width="260" height="56" fill="none">
  <g transform="translate(4, 4)">
${iconSvgContent}
  </g>
  <text x="64" y="32" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="700" fill="${textDark}" letter-spacing="-0.5">IDCraft <tspan font-weight="500" fill="${textSecondary}">India</tspan></text>
  <text x="65" y="47" font-family="Inter, -apple-system, sans-serif" font-size="10" font-weight="400" fill="#64748B" letter-spacing="0.4">INSTITUTIONAL IDENTITY CARDS</text>
</svg>`;
}
