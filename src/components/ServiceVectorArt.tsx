import React from 'react';

interface VectorProps {
  className?: string;
}

export const CockroachVector: React.FC<VectorProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Background & Geometry */}
    <rect width="240" height="180" rx="16" fill="#F4F7F5" />
    <circle cx="120" cy="90" r="64" fill="#E2EBE5" opacity="0.7" />
    <circle cx="120" cy="90" r="48" stroke="#52B788" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="120" cy="90" r="32" fill="#D8ECE0" opacity="0.5" />

    {/* Cockroach Silhouette & Anatomy */}
    {/* Antennae */}
    <path d="M112 50 C100 32 78 26 60 22" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M128 50 C140 32 162 26 180 22" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />

    {/* Legs */}
    {/* Top pair */}
    <path d="M102 70 C84 62 72 54 62 48" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M138 70 C156 62 168 54 178 48" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />
    {/* Middle pair */}
    <path d="M100 88 C76 86 64 88 52 96" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M140 88 C164 86 176 88 188 96" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />
    {/* Bottom pair */}
    <path d="M104 108 C80 118 68 132 56 150" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M136 108 C160 118 172 132 184 150" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" />

    {/* Head & Pronotum */}
    <ellipse cx="120" cy="54" rx="10" ry="8" fill="#1B4332" />
    <path d="M106 62 C106 58 134 58 134 62 L138 74 C138 78 102 78 102 74 Z" fill="#2D6A4F" />

    {/* Wing Covers (Elytra) */}
    <path d="M104 74 C104 74 120 76 120 128 C112 128 102 116 102 90 Z" fill="#1B4332" />
    <path d="M136 74 C136 74 120 76 120 128 C128 128 138 116 138 90 Z" fill="#2D6A4F" />
    <line x1="120" y1="74" x2="120" y2="128" stroke="#52B788" strokeWidth="1.2" />

    {/* Cerci (tail spikes) */}
    <path d="M114 128 L110 138" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M126 128 L130 138" stroke="#1B4332" strokeWidth="1.5" strokeLinecap="round" />

    {/* Bio-Rational Shield / Eco-Target Badge */}
    <g transform="translate(170, 115)">
      <circle cx="20" cy="20" r="18" fill="#1B4332" />
      <circle cx="20" cy="20" r="15" stroke="#52B788" strokeWidth="1.5" />
      <path d="M15 20 L19 24 L26 16" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const AntVector: React.FC<VectorProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="240" height="180" rx="16" fill="#F4F7F5" />
    <circle cx="120" cy="90" r="64" fill="#E2EBE5" opacity="0.7" />
    <circle cx="120" cy="90" r="48" stroke="#52B788" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

    {/* Ant Antennae (Elbowed) */}
    <path d="M114 50 L102 36 L90 38" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M126 50 L138 36 L150 38" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    {/* Ant 6 Legs (3 segments each) */}
    <path d="M112 76 L90 66 L72 58" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M128 76 L150 66 L168 58" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    <path d="M112 84 L84 84 L64 96" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M128 84 L156 84 L176 96" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    <path d="M112 92 L88 108 L74 134" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M128 92 L152 108 L166 134" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    {/* Head */}
    <ellipse cx="120" cy="56" rx="10" ry="12" fill="#1B4332" />
    {/* Mandibles */}
    <path d="M115 44 C118 42 120 42 120 42" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M125 44 C122 42 120 42 120 42" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />

    {/* Thorax (Mesosoma) */}
    <ellipse cx="120" cy="82" rx="7" ry="14" fill="#2D6A4F" />

    {/* Petiole (waist node) */}
    <circle cx="120" cy="100" r="3.5" fill="#1B4332" />

    {/* Gaster (Abdomen) */}
    <ellipse cx="120" cy="122" rx="13" ry="18" fill="#1B4332" />
    <ellipse cx="120" cy="120" rx="9" ry="12" fill="#2D6A4F" opacity="0.6" />

    {/* Botanical Colony Transfer Icon */}
    <g transform="translate(170, 115)">
      <circle cx="20" cy="20" r="18" fill="#1B4332" />
      <circle cx="20" cy="20" r="15" stroke="#52B788" strokeWidth="1.5" />
      <path d="M20 12 C16 16 15 22 20 28 C25 22 24 16 20 12 Z" fill="#52B788" />
    </g>
  </svg>
);

export const RatMouseVector: React.FC<VectorProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="240" height="180" rx="16" fill="#F4F7F5" />
    <circle cx="120" cy="90" r="64" fill="#E2EBE5" opacity="0.7" />
    <circle cx="120" cy="90" r="48" stroke="#52B788" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

    {/* Curved Rodent Tail */}
    <path d="M60 124 C40 120 30 95 38 78 C44 65 60 62 68 70" stroke="#2D6A4F" strokeWidth="2.5" strokeLinecap="round" fill="none" />

    {/* Body */}
    <ellipse cx="112" cy="102" rx="42" ry="26" fill="#1B4332" />
    <ellipse cx="106" cy="98" rx="34" ry="20" fill="#2D6A4F" />

    {/* Snout & Head */}
    <path d="M136 86 C144 80 170 88 178 94 C170 106 142 112 136 106 Z" fill="#1B4332" />
    <circle cx="180" cy="94" r="3" fill="#52B788" /> {/* Nose tip */}

    {/* Eye */}
    <circle cx="154" cy="91" r="2.5" fill="#FFFFFF" />
    <circle cx="154.5" cy="91" r="1.2" fill="#1B4332" />

    {/* Ear */}
    <ellipse cx="134" cy="78" rx="8" ry="11" fill="#1B4332" transform="rotate(-15 134 78)" />
    <ellipse cx="134" cy="78" rx="5" ry="7" fill="#52B788" opacity="0.7" transform="rotate(-15 134 78)" />

    {/* Whiskers */}
    <path d="M174 92 L198 84" stroke="#1B4332" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M176 95 L202 95" stroke="#1B4332" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M174 97 L196 104" stroke="#1B4332" strokeWidth="1.2" strokeLinecap="round" />

    {/* Paws */}
    <ellipse cx="150" cy="120" rx="6" ry="4" fill="#1B4332" />
    <ellipse cx="90" cy="124" rx="10" ry="5" fill="#1B4332" />

    {/* Structural Mesh & Exclusion Badge */}
    <g transform="translate(170, 115)">
      <circle cx="20" cy="20" r="18" fill="#1B4332" />
      <circle cx="20" cy="20" r="15" stroke="#52B788" strokeWidth="1.5" />
      <path d="M14 18 H26 M14 22 H26 M18 14 V26 M22 14 V26" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

export const MoleVector: React.FC<VectorProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="240" height="180" rx="16" fill="#F4F7F5" />
    <circle cx="120" cy="90" r="64" fill="#E2EBE5" opacity="0.7" />

    {/* Mound / Soil Ridge contours */}
    <path d="M30 135 C60 115 95 105 120 105 C145 105 180 115 210 135 Z" fill="#D8ECE0" />
    <path d="M40 145 C75 125 105 118 120 118 C135 118 165 125 200 145 Z" fill="#2D6A4F" opacity="0.15" />

    {/* Grass blades */}
    <path d="M50 132 L54 116 L60 132" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M180 132 L185 118 L192 134" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M194 135 L200 122 L204 135" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Subterranean Mole Body emerging */}
    <path d="M80 128 C80 92 105 76 120 76 C135 76 160 92 160 128 Z" fill="#1B4332" />
    <ellipse cx="120" cy="100" rx="28" ry="22" fill="#2D6A4F" />

    {/* Pointed Pink/Mint Snout */}
    <polygon points="120,62 112,74 128,74" fill="#52B788" />
    <circle cx="120" cy="62" r="3.5" fill="#1B4332" />

    {/* Large Digging Claws (Outward spade hands) */}
    {/* Left spade hand */}
    <path d="M92 100 C80 94 68 100 66 110 C74 114 84 112 92 108 Z" fill="#1B4332" />
    <path d="M64 104 L56 102 M64 109 L54 110 M66 114 L58 118" stroke="#52B788" strokeWidth="2" strokeLinecap="round" />

    {/* Right spade hand */}
    <path d="M148 100 C160 94 172 100 174 110 C166 114 156 112 148 108 Z" fill="#1B4332" />
    <path d="M176 104 L184 102 M176 109 L186 110 M174 114 L182 118" stroke="#52B788" strokeWidth="2" strokeLinecap="round" />

    {/* Subterranean Shield Badge */}
    <g transform="translate(170, 115)">
      <circle cx="20" cy="20" r="18" fill="#1B4332" />
      <circle cx="20" cy="20" r="15" stroke="#52B788" strokeWidth="1.5" />
      <path d="M14 18 C14 18 20 14 26 18 V22 C26 26 20 28 20 28 C20 28 14 26 14 22 Z" fill="#52B788" />
    </g>
  </svg>
);

export const BedbugFleaVector: React.FC<VectorProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="240" height="180" rx="16" fill="#F4F7F5" />
    <circle cx="120" cy="90" r="64" fill="#E2EBE5" opacity="0.7" />
    <circle cx="120" cy="90" r="48" stroke="#52B788" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

    {/* Bedbug Anatomy (Oval, segmented, flat body) */}
    {/* Antennae */}
    <path d="M112 52 L98 40 L90 42" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M128 52 L142 40 L150 42" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    {/* Legs */}
    <path d="M104 68 L84 60 L68 56" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M136 68 L156 60 L172 56" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    <path d="M102 84 L78 84 L62 94" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M138 84 L162 84 L178 94" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    <path d="M106 102 L86 116 L74 138" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M134 102 L154 116 L166 138" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

    {/* Head & Pronotum */}
    <ellipse cx="120" cy="56" rx="8" ry="6" fill="#1B4332" />
    <path d="M106 64 C106 60 134 60 134 64 C138 74 102 74 106 64 Z" fill="#2D6A4F" />

    {/* Broad Oval Segmented Abdomen */}
    <ellipse cx="120" cy="100" rx="26" ry="30" fill="#1B4332" />
    <ellipse cx="120" cy="98" rx="20" ry="24" fill="#2D6A4F" />

    {/* Abdominal segment ridges */}
    <path d="M102 84 C112 88 128 88 138 84" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M98 94 C110 100 130 100 142 94" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M98 106 C110 112 130 112 142 106" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M102 118 C112 122 128 122 138 118" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />

    {/* Thermal & Botanical Sanitisation Badge */}
    <g transform="translate(170, 115)">
      <circle cx="20" cy="20" r="18" fill="#1B4332" />
      <circle cx="20" cy="20" r="15" stroke="#52B788" strokeWidth="1.5" />
      <path d="M20 12 L22 17 L27 18 L23 22 L24 28 L20 25 L16 28 L17 22 L13 18 L18 17 Z" fill="#52B788" />
    </g>
  </svg>
);

export const BirdProofingVector: React.FC<VectorProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="240" height="180" rx="16" fill="#F4F7F5" />
    <circle cx="120" cy="90" r="64" fill="#E2EBE5" opacity="0.7" />

    {/* Tension Netting Wire Grid */}
    <g stroke="#52B788" strokeWidth="1" strokeDasharray="2 2" opacity="0.5">
      <line x1="40" y1="50" x2="200" y2="50" />
      <line x1="40" y1="75" x2="200" y2="75" />
      <line x1="40" y1="100" x2="200" y2="100" />
      <line x1="60" y1="35" x2="60" y2="115" />
      <line x1="90" y1="35" x2="90" y2="115" />
      <line x1="120" y1="35" x2="120" y2="115" />
      <line x1="150" y1="35" x2="150" y2="115" />
      <line x1="180" y1="35" x2="180" y2="115" />
    </g>

    {/* Ledge / Roof Profile */}
    <rect x="40" y="115" width="160" height="12" rx="3" fill="#1B4332" />
    <rect x="35" y="127" width="170" height="24" fill="#2D6A4F" />

    {/* 316 Stainless Anti-Roost Spikes (V-shaped spikes along track) */}
    <g stroke="#52B788" strokeWidth="2" strokeLinecap="round">
      <path d="M55 115 L50 85 M55 115 L62 88" />
      <path d="M80 115 L74 85 M80 115 L88 88" />
      <path d="M105 115 L98 85 M105 115 L112 88" />
      <path d="M130 115 L124 85 M130 115 L138 88" />
      <path d="M155 115 L148 85 M155 115 L162 88" />
      <path d="M180 115 L174 85 M180 115 L188 88" />
    </g>

    {/* Graceful Bird Silhouette in humane flight (deflected away from ledge) */}
    <path d="M110 52 C120 42 135 44 146 54 C134 56 126 50 118 56 C110 62 105 66 94 62 C100 58 106 58 110 52 Z" fill="#1B4332" />
    <path d="M146 54 C158 40 178 42 192 50 C176 54 166 48 156 56 Z" fill="#2D6A4F" />

    {/* Humane 10-Year Guarantee Badge */}
    <g transform="translate(170, 115)">
      <circle cx="20" cy="20" r="18" fill="#1B4332" />
      <circle cx="20" cy="20" r="15" stroke="#52B788" strokeWidth="1.5" />
      <path d="M15 20 L19 24 L26 16" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const BatRemovalVector: React.FC<VectorProps> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="240" height="180" rx="16" fill="#F4F7F5" />
    <circle cx="120" cy="90" r="64" fill="#E2EBE5" opacity="0.7" />
    <circle cx="120" cy="90" r="48" stroke="#52B788" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

    {/* Roof Eaves & One-Way Cone Geometry */}
    <path d="M30 45 L120 25 L210 45" stroke="#1B4332" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 50 L120 32 L200 50 L200 62 L40 62 Z" fill="#D8ECE0" opacity="0.6" />

    {/* Bat Silhouette with Broad Wings (Humane one-way release flight) */}
    {/* Left Wing with finger joints */}
    <path d="M120 85 C108 68 85 62 60 70 C66 84 80 88 88 98 C94 104 104 104 120 102 Z" fill="#1B4332" />
    <path d="M60 70 C72 74 82 82 88 98" stroke="#52B788" strokeWidth="1" opacity="0.5" />

    {/* Right Wing with finger joints */}
    <path d="M120 85 C132 68 155 62 180 70 C174 84 160 88 152 98 C146 104 136 104 120 102 Z" fill="#2D6A4F" />
    <path d="M180 70 C168 74 158 82 152 98" stroke="#52B788" strokeWidth="1" opacity="0.5" />

    {/* Bat Head & Pointed Ears */}
    <ellipse cx="120" cy="85" rx="7" ry="10" fill="#1B4332" />
    <polygon points="114,78 111,68 118,74" fill="#1B4332" />
    <polygon points="126,78 129,68 122,74" fill="#1B4332" />
    <circle cx="117" cy="84" r="1" fill="#FFFFFF" />
    <circle cx="123" cy="84" r="1" fill="#FFFFFF" />

    {/* One-way release valve arrow indication */}
    <path d="M120 115 L120 138 M115 132 L120 138 L125 132" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Humane Wildlife Compliant Badge */}
    <g transform="translate(170, 115)">
      <circle cx="20" cy="20" r="18" fill="#1B4332" />
      <circle cx="20" cy="20" r="15" stroke="#52B788" strokeWidth="1.5" />
      <path d="M14 20 C14 16 18 14 20 18 C22 14 26 16 26 20 C26 24 20 27 20 27 C20 27 14 24 14 20 Z" fill="#52B788" />
    </g>
  </svg>
);

export const ServiceVectorArt: React.FC<{ serviceId: string; className?: string }> = ({ serviceId, className }) => {
  switch (serviceId) {
    case 'cockroaches':
      return <CockroachVector className={className} />;
    case 'ants':
      return <AntVector className={className} />;
    case 'rats-mice':
      return <RatMouseVector className={className} />;
    case 'mole-treatment':
      return <MoleVector className={className} />;
    case 'bedbugs-fleas':
      return <BedbugFleaVector className={className} />;
    case 'bird-proofing':
      return <BirdProofingVector className={className} />;
    case 'bat-removal':
      return <BatRemovalVector className={className} />;
    default:
      return <CockroachVector className={className} />;
  }
};
