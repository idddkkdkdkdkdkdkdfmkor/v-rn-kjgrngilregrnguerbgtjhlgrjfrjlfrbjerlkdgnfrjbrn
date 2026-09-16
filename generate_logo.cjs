const fs = require('fs');
const isColor = true;
const primary = isColor ? '#2563EB' : '#0F172A';
const accent = isColor ? '#22C55E' : '#0F172A';
const textDark = '#0F172A';
const textSecondary = isColor ? '#2563EB' : '#334155';

const iconSvgContent = `
  <!-- Lanyard Clip Bracket -->
  <path d="M20 5C20 3.34315 21.3431 2 23 2H25C26.6569 2 28 3.34315 28 5V7H20V5Z" fill="${primary}" opacity="0.9"/>
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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 56" width="260" height="56" fill="none">
<g transform="translate(4, 4)">
${iconSvgContent}
</g>
<text x="64" y="32" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="700" fill="${textDark}" letter-spacing="-0.5">IDCraft <tspan font-weight="500" fill="${textSecondary}">India</tspan></text>
<text x="65" y="47" font-family="Inter, -apple-system, sans-serif" font-size="10" font-weight="400" fill="#64748B" letter-spacing="0.4">INSTITUTIONAL IDENTITY CARDS</text>
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" fill="none">
${iconSvgContent}
</svg>`;

fs.writeFileSync('public/idcraft-logo-horizontal.svg', svg);
fs.writeFileSync('public/idcraft-logo-icon.svg', iconSvg);
console.log('Logos generated at public/');
