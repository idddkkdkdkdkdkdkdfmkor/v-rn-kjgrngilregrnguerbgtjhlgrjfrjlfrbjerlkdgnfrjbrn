import confetti from 'canvas-confetti';

/**
 * Fires a golden star burst for 5-star Google review celebration
 */
export function fireReviewConfetti(): void {
  try {
    // Left burst
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.15, y: 0.65 },
      colors: ['#F59E0B', '#D97706', '#FBBF24', '#78350F', '#10B981'],
      ticks: 200,
      gravity: 1.1,
      scalar: 0.9,
    });

    // Right burst
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 0.85, y: 0.65 },
      colors: ['#F59E0B', '#D97706', '#FBBF24', '#78350F', '#10B981'],
      ticks: 200,
      gravity: 1.1,
      scalar: 0.9,
    });
  } catch {
    // Graceful fallback
  }
}
