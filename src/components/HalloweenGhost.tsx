const ANGLES = [0, 18, 36, 54, 72, 90];
const RADII = [40, 75, 110, 145, 180];

const polar = (radius: number, degrees: number) => {
	const angle = (degrees * Math.PI) / 180;
	return [radius * Math.cos(angle), radius * Math.sin(angle)];
};

const f = (value: number) => value.toFixed(1);

const WEB_SPOKES = ANGLES.map((degrees) => {
	const [x, y] = polar(190, degrees);
	return `M0 0L${f(x)} ${f(y)}`;
}).join('');

const WEB_RINGS = RADII.map((radius) =>
	ANGLES.slice(1)
		.map((degrees, index) => {
			const previous = ANGLES[index];
			const [x0, y0] = polar(radius, previous);
			const [cx, cy] = polar(radius * 0.86, (previous + degrees) / 2);
			const [x1, y1] = polar(radius, degrees);
			return `${index === 0 ? `M${f(x0)} ${f(y0)}` : ''}Q${f(cx)} ${f(cy)} ${f(x1)} ${f(y1)}`;
		})
		.join('')
).join('');

const BAT_WING = 'M60 30C50 14 30 8 4 16c8 5 10 12 8 20 7-5 14-4 18 4 5-8 12-9 19-4l11-6Z';

const MAPLE_LEAF = 'M20 2l3 7 6-3-1 8 7-2-4 6 5 3-8 3 2 6-7-1v7h-2v-7l-7 1 2-6-8-3 5-3-4-6 7 2-1-8 6 3Z';

const LEAVES = [
	{ pos: 'left-[4%]', size: 'w-6', color: 'fill-orange-500', fall: 'animate-[leaf-fall_11s_linear_infinite] [animation-delay:-2s]', sway: 'animate-[leaf-sway_3s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[12%]', size: 'w-8', color: 'fill-red-600', fall: 'animate-[leaf-fall_14s_linear_infinite] [animation-delay:-8s]', sway: 'animate-[leaf-sway_4s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[22%]', size: 'w-5', color: 'fill-yellow-500', fall: 'animate-[leaf-fall_10s_linear_infinite] [animation-delay:-5s]', sway: 'animate-[leaf-sway_2.5s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[33%]', size: 'w-7', color: 'fill-amber-600', fall: 'animate-[leaf-fall_13s_linear_infinite] [animation-delay:-11s]', sway: 'animate-[leaf-sway_3.5s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[45%]', size: 'w-6', color: 'fill-orange-700', fall: 'animate-[leaf-fall_12s_linear_infinite] [animation-delay:-1s]', sway: 'animate-[leaf-sway_4.5s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[56%]', size: 'w-8', color: 'fill-orange-500', fall: 'animate-[leaf-fall_15s_linear_infinite] [animation-delay:-9s]', sway: 'animate-[leaf-sway_3s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[67%]', size: 'w-5', color: 'fill-red-600', fall: 'animate-[leaf-fall_9s_linear_infinite] [animation-delay:-4s]', sway: 'animate-[leaf-sway_2.8s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[77%]', size: 'w-7', color: 'fill-yellow-500', fall: 'animate-[leaf-fall_13s_linear_infinite] [animation-delay:-7s]', sway: 'animate-[leaf-sway_4s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[86%]', size: 'w-6', color: 'fill-amber-600', fall: 'animate-[leaf-fall_11s_linear_infinite] [animation-delay:-10s]', sway: 'animate-[leaf-sway_3.2s_ease-in-out_infinite_alternate]' },
	{ pos: 'left-[94%]', size: 'w-8', color: 'fill-orange-700', fall: 'animate-[leaf-fall_16s_linear_infinite] [animation-delay:-3s]', sway: 'animate-[leaf-sway_5s_ease-in-out_infinite_alternate]' },
];

function Cobweb({ className }: { className: string }) {
	return (
		<svg className={`absolute w-40 h-40 sm:w-56 sm:h-56 text-slate-400 opacity-50 ${className}`} viewBox='0 0 190 190' fill='none'>
			<path d={WEB_SPOKES} stroke='currentColor' strokeWidth='1' strokeLinecap='round' />
			<path d={WEB_RINGS} stroke='currentColor' strokeWidth='0.8' strokeLinecap='round' />
		</svg>
	);
}

function Spider({ className, thread }: { className: string; thread: string }) {
	return (
		<div className={`absolute top-0 flex flex-col items-center origin-top animate-[spider-swing_4.5s_ease-in-out_infinite] motion-reduce:animate-none ${className}`}>
			<div className={`w-px bg-slate-400/70 ${thread}`} />
			<svg className='w-9 h-9' viewBox='0 0 60 60' fill='none'>
				<g className='stroke-slate-600' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
					<path d='M24 30L10 20L4 30M23 34L6 30L2 42M23 38L7 42L5 54M25 42L12 52L12 58' />
					<path d='M36 30L50 20L56 30M37 34L54 30L58 42M37 38L53 42L55 54M35 42L48 52L48 58' />
				</g>
				<circle cx='30' cy='38' r='11' className='fill-slate-900 stroke-slate-500' strokeWidth='1' />
				<circle cx='30' cy='24' r='7' className='fill-slate-900 stroke-slate-500' strokeWidth='1' />
				<circle cx='27.5' cy='23' r='1.5' className='fill-orange-400' />
				<circle cx='32.5' cy='23' r='1.5' className='fill-orange-400' />
			</svg>
		</div>
	);
}

function Bat({ className, flip = false }: { className: string; flip?: boolean }) {
	return (
		<div className={`absolute left-0 motion-reduce:hidden ${className}`}>
			<svg className={`w-full ${flip ? '-scale-x-100' : ''}`} viewBox='0 0 120 60' fill='none'>
				<g className='fill-slate-950 stroke-violet-300/40' strokeWidth='1' strokeLinejoin='round'>
					<g className='origin-[60px_30px] animate-[bat-flap_0.4s_ease-in-out_infinite]'>
						<path d={BAT_WING} />
					</g>
					<g transform='translate(120 0) scale(-1 1)'>
						<g className='origin-[60px_30px] animate-[bat-flap_0.4s_ease-in-out_infinite]'>
							<path d={BAT_WING} />
						</g>
					</g>
					<ellipse cx='60' cy='34' rx='6' ry='10' />
					<circle cx='60' cy='22' r='6' />
					<path d='M55 19l-2-9 6 5ZM65 19l2-9-6 5Z' />
				</g>
				<circle cx='57.5' cy='22' r='1.2' className='fill-amber-300' />
				<circle cx='62.5' cy='22' r='1.2' className='fill-amber-300' />
			</svg>
		</div>
	);
}

function Leaf({ pos, size, color, fall, sway }: (typeof LEAVES)[number]) {
	return (
		<div className={`absolute top-0 motion-reduce:hidden ${pos} ${fall}`}>
			<div className={sway}>
				<svg className={size} viewBox='0 0 40 40' role='presentation'>
					<path d={MAPLE_LEAF} className={`${color} stroke-black/20`} strokeWidth='0.8' strokeLinejoin='round' />
				</svg>
			</div>
		</div>
	);
}

function Ghost() {
	return (
		<div className='absolute top-[30vh] left-0 w-[clamp(72px,9vw,120px)] animate-[ghost-cross_20s_linear_infinite] motion-reduce:hidden'>
			<div className='animate-[ghost-bob_3.2s_ease-in-out_infinite] drop-shadow-[0_0_22px_rgba(167,139,250,0.65)]'>
				<svg viewBox='0 0 120 150' role='presentation'>
					<defs>
						<linearGradient id='ghost-body' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#ffffff' stopOpacity='0.95' />
							<stop offset='100%' stopColor='#c4b5fd' stopOpacity='0.8' />
						</linearGradient>
					</defs>
					<ellipse cx='17' cy='88' rx='9' ry='5' transform='rotate(25 17 88)' fill='url(#ghost-body)' />
					<ellipse cx='103' cy='88' rx='9' ry='5' transform='rotate(-25 103 88)' fill='url(#ghost-body)' />
					<path d='M20 125V58C20 30 38 12 60 12S100 30 100 58V125a13.33 13 0 0 1-26.67 0 13.33 13 0 0 1-26.66 0 13.33 13 0 0 1-26.67 0Z' fill='url(#ghost-body)' />
					<ellipse cx='46' cy='62' rx='6' ry='8' fill='#1e1b2e' />
					<ellipse cx='74' cy='62' rx='6' ry='8' fill='#1e1b2e' />
					<circle cx='48' cy='59' r='2' fill='#ffffff' />
					<circle cx='76' cy='59' r='2' fill='#ffffff' />
					<ellipse cx='60' cy='84' rx='5' ry='6.5' fill='#1e1b2e' />
					<ellipse cx='36' cy='78' rx='6' ry='3.5' fill='#f9a8d4' opacity='0.55' />
					<ellipse cx='84' cy='78' rx='6' ry='3.5' fill='#f9a8d4' opacity='0.55' />
				</svg>
			</div>
		</div>
	);
}

export function HalloweenGhost() {
	return (
		<div className='fixed inset-0 z-20 pointer-events-none overflow-hidden' aria-hidden='true'>
			<style>{`
				@keyframes spider-swing { 0%, 100% { transform: rotate(-7deg); } 50% { transform: rotate(7deg); } }
				@keyframes bat-flap { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.25); } }
				@keyframes bat-fly {
					0% { transform: translate3d(-20vw, 0, 0); }
					25% { transform: translate3d(5vw, -4vh, 0); }
					50% { transform: translate3d(45vw, 5vh, 0); }
					75% { transform: translate3d(80vw, -5vh, 0); }
					100% { transform: translate3d(120vw, 2vh, 0); }
				}
				@keyframes ghost-cross {
					0% { transform: translate3d(-20vw, 0, 0); opacity: 0; }
					18% { opacity: 0; }
					28% { opacity: 0.9; }
					58% { opacity: 0.9; }
					70% { opacity: 0; }
					100% { transform: translate3d(120vw, 0, 0); opacity: 0; }
				}
				@keyframes ghost-bob {
					0%, 100% { transform: translateY(-12px) rotate(-4deg); }
					50% { transform: translateY(14px) rotate(4deg); }
				}
				@keyframes leaf-fall {
					0% { transform: translate3d(0, -15vh, 0); }
					100% { transform: translate3d(0, 115vh, 0); }
				}
				@keyframes leaf-sway {
					0% { transform: translateX(-28px) rotate(-45deg); }
					100% { transform: translateX(28px) rotate(45deg); }
				}
			`}</style>

			<Cobweb className='top-0 left-0' />
			<Cobweb className='top-0 right-0 -scale-x-100' />
			<Cobweb className='bottom-0 left-0 -scale-y-100' />
			<Cobweb className='bottom-0 right-0 rotate-180' />

			<Spider className='left-[14%] [animation-delay:-1s]' thread='h-28' />
			<Spider className='left-[36%] scale-75 [animation-delay:-2.5s]' thread='h-16' />
			<Spider className='right-[18%] [animation-delay:-3.5s]' thread='h-36' />

			{LEAVES.map((leaf) => (
				<Leaf key={leaf.pos} {...leaf} />
			))}

			<Bat className='top-[10%] w-14 animate-[bat-fly_10s_linear_infinite]' />
			<Bat className='top-[28%] w-10 animate-[bat-fly_14s_linear_infinite] [animation-delay:-6s] [animation-direction:reverse]' flip />
			<Bat className='top-[46%] w-12 animate-[bat-fly_12s_linear_infinite] [animation-delay:-9s]' />

			<Ghost />
		</div>
	);
}