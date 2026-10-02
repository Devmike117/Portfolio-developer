interface ChristmasLightsProps {
  darkMode: boolean;
}

const BULBS = [
  { fill: 'fill-red-500', glow: 'drop-shadow-[0_0_5px_rgba(239,68,68,0.95)]' },
  { fill: 'fill-green-400', glow: 'drop-shadow-[0_0_5px_rgba(74,222,128,0.95)]' },
  { fill: 'fill-blue-500', glow: 'drop-shadow-[0_0_5px_rgba(59,130,246,0.95)]' },
  { fill: 'fill-yellow-300', glow: 'drop-shadow-[0_0_5px_rgba(253,224,71,0.95)]' },
  { fill: 'fill-fuchsia-500', glow: 'drop-shadow-[0_0_5px_rgba(217,70,239,0.95)]' },
  { fill: 'fill-cyan-400', glow: 'drop-shadow-[0_0_5px_rgba(34,211,238,0.95)]' },
];

const BULB_DELAYS = [
  '',
  '[animation-delay:-0.3s]',
  '[animation-delay:-0.6s]',
  '[animation-delay:-0.9s]',
  '[animation-delay:-1.2s]',
  '[animation-delay:-1.5s]',
];

const SNOWFLAKES = [
  'left-[3%] h-1.5 w-1.5 animate-[snow-fall_14s_linear_infinite]',
  'left-[10%] h-1 w-1 animate-[snow-fall_18s_linear_infinite] [animation-delay:-6s]',
  'left-[17%] h-2 w-2 animate-[snow-fall_16s_linear_infinite] [animation-delay:-11s]',
  'left-[26%] h-1 w-1 animate-[snow-fall_20s_linear_infinite] [animation-delay:-3s]',
  'left-[34%] h-1.5 w-1.5 animate-[snow-fall_15s_linear_infinite] [animation-delay:-9s]',
  'left-[42%] h-2 w-2 animate-[snow-fall_19s_linear_infinite] [animation-delay:-14s]',
  'left-[50%] h-1 w-1 animate-[snow-fall_13s_linear_infinite] [animation-delay:-5s]',
  'left-[58%] h-1.5 w-1.5 animate-[snow-fall_17s_linear_infinite] [animation-delay:-12s]',
  'left-[66%] h-2 w-2 animate-[snow-fall_21s_linear_infinite] [animation-delay:-8s]',
  'left-[74%] h-1 w-1 animate-[snow-fall_14s_linear_infinite] [animation-delay:-2s]',
  'left-[81%] h-1.5 w-1.5 animate-[snow-fall_18s_linear_infinite] [animation-delay:-10s]',
  'left-[88%] h-2 w-2 animate-[snow-fall_16s_linear_infinite] [animation-delay:-4s]',
  'left-[94%] h-1 w-1 animate-[snow-fall_20s_linear_infinite] [animation-delay:-13s]',
];

const TREE_LIGHTS = [
  [50, 26],
  [42, 46],
  [60, 52],
  [31, 66],
  [53, 74],
  [70, 84],
  [22, 96],
  [46, 100],
];

const BULBS_PER_SWAG = [0.125, 0.375, 0.625, 0.875].map((t) => ({
  x: 160 * t,
  y: (1 - t) ** 2 * 6 + 2 * t * (1 - t) * 34 + t ** 2 * 6,
}));

function Swag({ index, darkMode, className }: { index: number; darkMode: boolean; className: string }) {
  return (
    <div className={`w-1/4 shrink-0 sm:w-1/6 lg:w-[12.5%] ${className}`}>
      <svg className="block h-auto w-full overflow-visible" viewBox="0 0 160 42" fill="none">
        <path
          d="M0 6Q80 34 160 6"
          className={darkMode ? 'stroke-emerald-700' : 'stroke-emerald-900'}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="0" cy="6" r="2" className="fill-amber-500" />
        <circle cx="160" cy="6" r="2" className="fill-amber-500" />
        {BULBS_PER_SWAG.map((position, bulbIndex) => {
          const globalIndex = index * BULBS_PER_SWAG.length + bulbIndex;
          const bulb = BULBS[globalIndex % BULBS.length];
          return (
            <g key={bulbIndex} transform={`translate(${position.x} ${position.y})`}>
              <rect x="-2.5" y="0" width="5" height="5" rx="1" className={darkMode ? 'fill-emerald-700' : 'fill-emerald-900'} />
              <g className={`animate-[bulb-twinkle_1.8s_ease-in-out_infinite] motion-reduce:animate-none ${bulb.glow} ${BULB_DELAYS[(globalIndex * 5) % BULB_DELAYS.length]}`}>
                <path d="M-4 5h8c2 5 1 11-4 13-5-2-6-8-4-13Z" className={bulb.fill} />
                <ellipse cx="-1.5" cy="9" rx="1" ry="2.2" className="fill-white" fillOpacity="0.6" />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Ornament({ className, thread, ball }: { className: string; thread: string; ball: string }) {
  return (
    <div className={`absolute top-0 flex origin-top flex-col items-center animate-[ornament-swing_5s_ease-in-out_infinite] motion-reduce:animate-none ${className}`}>
      <div className={`w-px bg-slate-400/70 ${thread}`} />
      <svg className="h-10 w-8" viewBox="0 0 32 40">
        <rect x="12" y="0" width="8" height="6" rx="1.5" className="fill-yellow-400" />
        <circle cx="16" cy="24" r="14" className={ball} />
        <path d="M4 26c7 5 17 5 24 0" fill="none" className="stroke-yellow-300" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
        <path d="M7 19c2-6 8-9 13-7" fill="none" className="stroke-white" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Tree() {
  return (
    <div className="absolute bottom-3 left-3 w-20 sm:w-28">
      <svg className="drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]" viewBox="0 0 100 124" role="presentation">
        <rect x="43" y="108" width="14" height="14" rx="2" className="fill-amber-900" />
        <path d="M50 52L94 108H6Z" className="fill-emerald-800" />
        <path d="M50 30L86 80H14Z" className="fill-emerald-700" />
        <path d="M50 10L78 52H22Z" className="fill-emerald-600" />
        {TREE_LIGHTS.map(([x, y], index) => {
          const bulb = BULBS[index % BULBS.length];
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2.8"
              className={`animate-[bulb-twinkle_1.8s_ease-in-out_infinite] motion-reduce:animate-none ${bulb.fill} ${bulb.glow} ${BULB_DELAYS[(index * 5) % BULB_DELAYS.length]}`}
            />
          );
        })}
        <path
          d="M50 0l2.9 6 6.6.9-4.8 4.6 1.2 6.5L50 14.8l-5.9 3.2 1.2-6.5-4.8-4.6 6.6-.9Z"
          className="fill-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.95)] animate-[bulb-twinkle_2.4s_ease-in-out_infinite] motion-reduce:animate-none"
        />
      </svg>
    </div>
  );
}

function Gifts() {
  return (
    <div className="absolute bottom-3 right-3 w-24 sm:w-32">
      <svg viewBox="0 0 120 64" role="presentation">
        <rect x="4" y="26" width="44" height="34" rx="3" className="fill-rose-600" />
        <rect x="24" y="26" width="4" height="34" className="fill-yellow-300" />
        <rect x="4" y="40" width="44" height="4" className="fill-yellow-300" />
        <ellipse cx="19" cy="22" rx="8" ry="5" transform="rotate(-25 19 22)" className="fill-yellow-300" />
        <ellipse cx="33" cy="22" rx="8" ry="5" transform="rotate(25 33 22)" className="fill-yellow-300" />
        <circle cx="26" cy="24" r="3" className="fill-amber-500" />

        <rect x="52" y="36" width="34" height="24" rx="3" className="fill-cyan-600" />
        <rect x="67" y="36" width="4" height="24" className="fill-white" />
        <rect x="52" y="46" width="34" height="4" className="fill-white" />
        <ellipse cx="63" cy="33" rx="6" ry="4" transform="rotate(-25 63 33)" className="fill-white" />
        <ellipse cx="75" cy="33" rx="6" ry="4" transform="rotate(25 75 33)" className="fill-white" />

        <rect x="90" y="42" width="26" height="18" rx="3" className="fill-emerald-600" />
        <rect x="101" y="42" width="4" height="18" className="fill-red-500" />
        <rect x="90" y="49" width="26" height="3" className="fill-red-500" />
        <ellipse cx="97" cy="39" rx="5" ry="3.5" transform="rotate(-25 97 39)" className="fill-red-500" />
        <ellipse cx="109" cy="39" rx="5" ry="3.5" transform="rotate(25 109 39)" className="fill-red-500" />
      </svg>
    </div>
  );
}

function Sleigh() {
  return (
    <div className="absolute left-0 top-[22vh] w-[clamp(110px,14vw,170px)] animate-[sleigh-cross_45s_linear_infinite] motion-reduce:hidden">
      <div className="animate-[sleigh-bob_3s_ease-in-out_infinite] drop-shadow-[0_0_14px_rgba(253,224,71,0.45)]">
        <svg viewBox="0 0 160 64" role="presentation">
          <ellipse cx="14" cy="24" rx="8" ry="9" className="fill-amber-800" />
          <path d="M8 28h52c0 11-7 18-18 18H22C13 46 8 38 8 28Z" className="fill-red-600" />
          <path d="M3 54h54c7 0 9-5 7-9" fill="none" className="stroke-yellow-400" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 46v8M46 46v8" className="stroke-yellow-400" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="34" cy="22" r="7" className="fill-orange-200" />
          <path d="M28 24c2 8 10 8 12 0Z" className="fill-white" />
          <path d="M27 19c0-8 7-12 15-8l-2 8Z" className="fill-red-600" />
          <circle cx="42" cy="11" r="2.5" className="fill-white" />

          <path d="M60 36C72 36 78 38 90 38" fill="none" className="stroke-yellow-400" strokeWidth="1.5" />

          <circle cx="92" cy="34" r="2.5" className="fill-white" />
          <ellipse cx="108" cy="38" rx="16" ry="8" className="fill-amber-800" />
          <path d="M98 44l-6 10M104 46l-3 10M114 46l6 8M120 43l8 8" fill="none" className="stroke-amber-800" strokeWidth="3" strokeLinecap="round" />
          <path d="M118 34l8-12" className="stroke-amber-800" strokeWidth="6" strokeLinecap="round" />
          <circle cx="129" cy="22" r="6" className="fill-amber-800" />
          <path d="M127 17l-3-9M124 8l-4-1M124 8l1-5M131 16l4-8M135 8l4-1M135 8l-1-5" fill="none" className="stroke-amber-200" strokeWidth="2" strokeLinecap="round" />
          <circle cx="130" cy="21" r="1" className="fill-stone-900" />
          <circle cx="134.5" cy="24" r="2.6" className="fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,1)] animate-[bulb-twinkle_1s_ease-in-out_infinite]" />
        </svg>
      </div>
    </div>
  );
}

export const ChristmasLights = ({ darkMode }: ChristmasLightsProps) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes bulb-twinkle { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes ornament-swing { 0%, 100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
        @keyframes snow-fall {
          0% { transform: translate3d(0, -5vh, 0); opacity: 0; }
          10% { opacity: 0.9; }
          50% { transform: translate3d(30px, 50vh, 0); }
          90% { opacity: 0.9; }
          100% { transform: translate3d(-20px, 105vh, 0); opacity: 0; }
        }
        @keyframes sleigh-cross {
          0% { transform: translate3d(-25vw, 0, 0); }
          45% { transform: translate3d(125vw, 0, 0); }
          100% { transform: translate3d(125vw, 0, 0); }
        }
        @keyframes sleigh-bob {
          0%, 100% { transform: translateY(-8px) rotate(-2deg); }
          50% { transform: translateY(8px) rotate(2deg); }
        }
      `}</style>

      {/* Guirnalda de luces */}
      <div className="absolute inset-x-0 top-0 flex">
        {Array.from({ length: 8 }, (_, index) => (
          <Swag
            key={index}
            index={index}
            darkMode={darkMode}
            className={index >= 6 ? 'hidden lg:block' : index >= 4 ? 'hidden sm:block' : ''}
          />
        ))}
      </div>

      {/* Esferas colgantes */}
      <Ornament className="left-[10%]" thread="h-24" ball="fill-red-600" />
      <Ornament className="left-[46%] scale-90" thread="h-16" ball="fill-blue-600" />
      <Ornament className="right-[22%]" thread="h-28" ball="fill-emerald-600" />
      <Ornament className="right-[5%] scale-90" thread="h-20" ball="fill-fuchsia-600" />

      {/* Nieve */}
      {SNOWFLAKES.map((flake) => (
        <span
          key={flake}
          className={`absolute -top-4 rounded-full opacity-80 motion-reduce:hidden ${darkMode ? 'bg-white' : 'bg-sky-300'} ${flake}`}
        />
      ))}

      <Sleigh />
      <Tree />
      <Gifts />
    </div>
  );
};