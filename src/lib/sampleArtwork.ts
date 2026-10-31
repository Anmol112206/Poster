/**
 * High-resolution embedded artwork templates for instant custom poster design.
 */
export const SAMPLE_ARTWORKS = [
  {
    id: "ronin",
    name: "Crimson Ronin",
    width: 2400,
    height: 3400,
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1700" width="1200" height="1700">
        <defs>
          <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#141419"/>
            <stop offset="40%" stop-color="#2c1820"/>
            <stop offset="70%" stop-color="#641e16"/>
            <stop offset="100%" stop-color="#c8501e"/>
          </linearGradient>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ff4d2e"/>
            <stop offset="100%" stop-color="#991b1b"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1700" fill="url(#sky)"/>
        <circle cx="600" cy="720" r="340" fill="url(#sunGrad)"/>
        <!-- Distant Mountains -->
        <polygon points="0,1100 280,820 620,1140" fill="#1b1217" opacity="0.9"/>
        <polygon points="450,1160 820,760 1200,1120" fill="#150d12" opacity="0.95"/>
        <polygon points="120,1280 480,980 900,1320" fill="#0f090d"/>
        <!-- Misty Pine Trees -->
        <g fill="#080406">
          <polygon points="100,1250 80,1400 120,1400"/>
          <polygon points="150,1210 130,1380 170,1380"/>
          <polygon points="220,1230 195,1420 245,1420"/>
          <polygon points="980,1200 955,1400 1005,1400"/>
          <polygon points="1060,1240 1040,1410 1080,1410"/>
        </g>
        <!-- Ground Silhouette -->
        <rect y="1360" width="1200" height="340" fill="#080406"/>
        <!-- Solitary Ronin Silhouette -->
        <g fill="#050304" transform="translate(560, 1140) scale(1.6)">
          <path d="M25,0 C30,0 35,5 35,12 C35,18 30,22 25,22 C20,22 15,18 15,12 C15,5 20,0 25,0 Z"/> <!-- Head -->
          <ellipse cx="25" cy="18" rx="28" ry="7" /> <!-- Straw Hat -->
          <path d="M12,24 L38,24 L48,85 L2,85 Z"/> <!-- Cloak -->
          <line x1="8" y1="20" x2="62" y2="92" stroke="#050304" stroke-width="4"/> <!-- Katana Scabbard -->
        </g>
        <text x="600" y="1600" font-family="serif" font-size="28" font-weight="600" fill="#e5e5e5" text-anchor="middle" letter-spacing="12">THE WAY OF THE RONIN</text>
        <text x="600" y="1640" font-family="sans-serif" font-size="14" fill="#a3a3a3" text-anchor="middle" letter-spacing="6">CAMINO PRINT EDITIONS • BIHTA STUDIO</text>
      </svg>
    `)}`,
  },
  {
    id: "interstellar",
    name: "Cosmic Horizon",
    width: 2400,
    height: 3400,
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1700" width="1200" height="1700">
        <defs>
          <radialGradient id="nebula" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#4c1d95"/>
            <stop offset="40%" stop-color="#1e1b4b"/>
            <stop offset="80%" stop-color="#0a0a14"/>
            <stop offset="100%" stop-color="#030308"/>
          </radialGradient>
          <linearGradient id="disk" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fdba74"/>
            <stop offset="30%" stop-color="#f97316"/>
            <stop offset="50%" stop-color="#ffffff"/>
            <stop offset="70%" stop-color="#f97316"/>
            <stop offset="100%" stop-color="#fdba74"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1700" fill="url(#nebula)"/>
        <!-- Star Field -->
        <g fill="#ffffff" opacity="0.8">
          <circle cx="120" cy="180" r="1.5"/><circle cx="340" cy="90" r="2"/><circle cx="560" cy="240" r="1"/>
          <circle cx="890" cy="140" r="2.5"/><circle cx="1040" cy="280" r="1.5"/><circle cx="210" cy="460" r="1"/>
          <circle cx="980" cy="620" r="2"/><circle cx="150" cy="890" r="1.5"/><circle cx="380" cy="1200" r="2"/>
          <circle cx="820" cy="1320" r="1.5"/><circle cx="1080" cy="1080" r="2"/>
        </g>
        <!-- Gravitational Lensing Accretion Ring -->
        <ellipse cx="600" cy="740" rx="420" ry="110" fill="none" stroke="url(#disk)" stroke-width="26" opacity="0.95" transform="rotate(-14, 600, 740)"/>
        <!-- Black Hole Event Horizon Sphere -->
        <circle cx="600" cy="740" r="160" fill="#000000" stroke="#f97316" stroke-width="4"/>
        <!-- Lower Ring Cross Segment -->
        <ellipse cx="600" cy="750" rx="420" ry="110" fill="none" stroke="url(#disk)" stroke-width="20" opacity="0.75" stroke-dasharray="700 800" transform="rotate(-14, 600, 740)"/>
        <text x="600" y="1520" font-family="serif" font-size="34" font-weight="700" fill="#f8fafc" text-anchor="middle" letter-spacing="16">EVENT HORIZON</text>
        <text x="600" y="1570" font-family="monospace" font-size="14" fill="#94a3b8" text-anchor="middle" letter-spacing="8">GARGANTUA • 1.01 LIGHT-YEARS • ISO 216</text>
      </svg>
    `)}`,
  },
  {
    id: "bauhaus",
    name: "Bauhaus Minimalist",
    width: 2400,
    height: 3400,
    dataUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1700" width="1200" height="1700">
        <rect width="1200" height="1700" fill="#f4efe6"/>
        <!-- Bauhaus primary shapes -->
        <rect x="180" y="240" width="380" height="380" fill="#1d4ed8"/>
        <circle cx="780" cy="560" r="240" fill="#dc2626"/>
        <polygon points="340,780 720,1320 180,1320" fill="#eab308"/>
        <!-- Accent lines and grid -->
        <line x1="120" y1="720" x2="1080" y2="720" stroke="#1c1917" stroke-width="8"/>
        <line x1="560" y1="140" x2="560" y2="1520" stroke="#1c1917" stroke-width="4" stroke-dasharray="12 12"/>
        <circle cx="840" cy="1100" r="160" fill="none" stroke="#1c1917" stroke-width="12"/>
        <text x="180" y="1500" font-family="sans-serif" font-size="52" font-weight="900" fill="#1c1917" letter-spacing="4">BAUHAUS</text>
        <text x="180" y="1550" font-family="sans-serif" font-size="20" font-weight="600" fill="#78716c" letter-spacing="8">WEIMAR AUSSTELLUNG • 1923</text>
      </svg>
    `)}`,
  },
];
