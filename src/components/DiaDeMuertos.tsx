const papelPicado = ['fill-rose-600', 'fill-orange-500', 'fill-yellow-500', 'fill-violet-600', 'fill-cyan-600', 'fill-green-600'];

const SWAY_DELAYS = [
	'',
	'[animation-delay:-0.6s]',
	'[animation-delay:-1.2s]',
	'[animation-delay:-1.8s]',
	'[animation-delay:-2.4s]',
	'[animation-delay:-3s]',
];

const PETALS = [
	'left-[8%] animate-[petal-fall_16s_linear_infinite]',
	'left-[24%] animate-[petal-fall_20s_linear_infinite] [animation-delay:-7s]',
	'left-[41%] animate-[petal-fall_14s_linear_infinite] [animation-delay:-3s]',
	'left-[58%] animate-[petal-fall_18s_linear_infinite] [animation-delay:-11s]',
	'left-[73%] animate-[petal-fall_15s_linear_infinite] [animation-delay:-5s]',
	'left-[90%] animate-[petal-fall_19s_linear_infinite] [animation-delay:-9s]',
];

function PapelPicado({ color, variant, className }: { color: string; variant: number; className: string }) {
	return (
		<svg className={`origin-top animate-[papel-sway_4s_ease-in-out_infinite] drop-shadow-sm motion-reduce:animate-none ${className}`} viewBox='0 0 80 64'>
			<path d='M1 0h78v50L66 64 53 50 40 64 27 50 14 64 1 50Z' className={color} />
			<rect x='1' width='78' height='4' className='fill-black' fillOpacity='0.18' />
			<g className='opacity-90'>
				{variant === 0 && (
					<>
						<circle cx='40' cy='22' r='8' className='fill-orange-50' />
						<path d='M25 42h30M31 37v10M49 37v10' fill='none' className='stroke-orange-50' strokeWidth='3' strokeLinecap='round' />
					</>
				)}
				{variant === 1 && (
					<>
						<path d='M40 8l12 14-12 14-12-14Z' className='fill-orange-50' />
						<circle cx='40' cy='22' r='3.5' className={color} />
						<circle cx='20' cy='40' r='3' className='fill-orange-50' />
						<circle cx='40' cy='42' r='3' className='fill-orange-50' />
						<circle cx='60' cy='40' r='3' className='fill-orange-50' />
					</>
				)}
				{variant === 2 && (
					<>
						<circle cx='40' cy='13' r='5' className='fill-orange-50' />
						<circle cx='49' cy='22' r='5' className='fill-orange-50' />
						<circle cx='40' cy='31' r='5' className='fill-orange-50' />
						<circle cx='31' cy='22' r='5' className='fill-orange-50' />
						<circle cx='40' cy='22' r='3.5' className={color} />
						<path d='M16 46l8-6 8 6 8-6 8 6 8-6 8 6' fill='none' className='stroke-orange-50' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
					</>
				)}
			</g>
		</svg>
	);
}

function Marigold({ className }: { className: string }) {
	return (
		<svg className={`absolute animate-[marigold-spin_40s_linear_infinite] motion-reduce:animate-none ${className}`} viewBox='0 0 64 64' fill='none'>
			{Array.from({ length: 12 }, (_, index) => (
				<ellipse key={`outer-${index}`} cx='32' cy='14' rx='6.5' ry='13' className='fill-orange-500' transform={`rotate(${index * 30} 32 32)`} />
			))}
			{Array.from({ length: 8 }, (_, index) => (
				<ellipse key={`inner-${index}`} cx='32' cy='20' rx='4.5' ry='8' className='fill-amber-400' transform={`rotate(${index * 45 + 22.5} 32 32)`} />
			))}
			<circle cx='32' cy='32' r='5' className='fill-amber-700' />
			<circle cx='30.5' cy='30.5' r='1.6' className='fill-amber-300' />
		</svg>
	);
}

function CrownFlower({ x, y }: { x: number; y: number }) {
	return (
		<g transform={`translate(${x} ${y})`}>
			<circle r='8' className='fill-orange-500' />
			<circle r='5' className='fill-amber-400' />
			<circle r='2' className='fill-amber-700' />
		</g>
	);
}

function EyeSocket({ x, y }: { x: number; y: number }) {
	return (
		<g transform={`translate(${x} ${y})`}>
			{Array.from({ length: 8 }, (_, index) => (
				<ellipse key={index} cy='-14' rx='3.2' ry='5' className='fill-rose-600' transform={`rotate(${index * 45})`} />
			))}
			<circle r='12' className='fill-violet-600' />
			<circle r='8' className='fill-stone-900' />
			<circle cx='-2.5' cy='-2.5' r='2' className='fill-orange-50' fillOpacity='0.8' />
		</g>
	);
}

function Calavera() {
	return (
		<div className='absolute top-24 right-[8%] w-20 sm:w-28'>
			<div className='animate-[calavera-float_5s_ease-in-out_infinite] drop-shadow-[0_0_18px_rgba(249,115,22,0.55)] motion-reduce:animate-none'>
				<svg viewBox='0 0 120 140' role='presentation'>
					<path
						d='M60 8C31 8 14 30 14 58c0 19 9 31 22 38v20h48V96c13-7 22-19 22-38C106 30 89 8 60 8Z'
						className='fill-orange-50 stroke-orange-500'
						strokeWidth='3'
						strokeLinejoin='round'
					/>

					<CrownFlower x={28} y={28} />
					<CrownFlower x={42} y={15} />
					<CrownFlower x={60} y={10} />
					<CrownFlower x={78} y={15} />
					<CrownFlower x={92} y={28} />

					<path d='M60 24l5 7-5 7-5-7Z' className='fill-green-600' />
					<circle cx='46' cy='31' r='2' className='fill-yellow-500' />
					<circle cx='74' cy='31' r='2' className='fill-yellow-500' />

					<EyeSocket x={38} y={58} />
					<EyeSocket x={82} y={58} />

					<path d='M60 74c-4 5-5 9 0 13 5-4 4-8 0-13Z' className='fill-stone-900' />

					<circle cx='25' cy='80' r='4' className='fill-green-600' />
					<circle cx='25' cy='80' r='1.5' className='fill-orange-50' />
					<circle cx='95' cy='80' r='4' className='fill-green-600' />
					<circle cx='95' cy='80' r='1.5' className='fill-orange-50' />

					<path d='M31 88c11 7 47 7 58 0' fill='none' className='stroke-cyan-600' strokeWidth='3' strokeLinecap='round' />
					<rect x='38' y='96' width='44' height='16' rx='4' className='fill-orange-50 stroke-orange-500' strokeWidth='2.5' />
					<path d='M49 96v16M60 96v16M71 96v16' className='stroke-orange-500' strokeWidth='2' strokeLinecap='round' />
				</svg>
			</div>
		</div>
	);
}

function Candle({ body, delay }: { body: string; delay: string }) {
	return (
		<div className='flex flex-col items-center'>
			<svg
				className={`h-6 w-4 origin-bottom animate-[flame-flicker_1.6s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] motion-reduce:animate-none ${delay}`}
				viewBox='0 0 16 24'
			>
				<path d='M8 0C12 7 15 11 15 16a7 7 0 0 1-14 0C1 11 4 8 8 0Z' className='fill-orange-500' />
				<path d='M8 9c3 4 4 6 4 8a4 4 0 0 1-8 0c0-2 1-4 4-8Z' className='fill-amber-300' />
			</svg>
			<div className='h-1.5 w-0.5 bg-stone-800' />
			<div className={`w-4 rounded-t-sm bg-gradient-to-b from-amber-50 to-amber-200 ${body}`} />
		</div>
	);
}

export function DiaDeMuertos() {
	return (
		<div className='fixed inset-0 z-20 pointer-events-none overflow-hidden' aria-hidden='true'>
			<style>{`
				@keyframes papel-sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
				@keyframes marigold-spin { to { transform: rotate(360deg); } }
				@keyframes petal-fall {
					0% { transform: translate3d(0, -5vh, 0) rotate(0deg); opacity: 0; }
					10% { opacity: 0.9; }
					50% { transform: translate3d(40px, 50vh, 0) rotate(180deg); }
					90% { opacity: 0.9; }
					100% { transform: translate3d(-20px, 110vh, 0) rotate(360deg); opacity: 0; }
				}
				@keyframes calavera-float {
					0%, 100% { transform: translateY(0) rotate(-2deg); }
					50% { transform: translateY(-10px) rotate(2deg); }
				}
				@keyframes flame-flicker {
					0%, 100% { transform: scale(1, 1) rotate(-2deg); opacity: 0.95; }
					30% { transform: scale(0.92, 1.08) rotate(2deg); opacity: 1; }
					60% { transform: scale(1.05, 0.94) rotate(-1deg); opacity: 0.85; }
				}
			`}</style>

			<div className='absolute inset-x-0 top-0 h-px bg-stone-300/60' />
			<div className='absolute inset-x-0 top-0 flex justify-between px-2'>
				{Array.from({ length: 12 }, (_, index) => (
					<PapelPicado
						key={index}
						color={papelPicado[index % papelPicado.length]}
						variant={index % 3}
						className={`w-12 md:w-14 lg:w-16 ${index >= 6 ? 'hidden md:block' : ''} ${SWAY_DELAYS[index % SWAY_DELAYS.length]}`}
					/>
				))}
			</div>

			<Marigold className='top-20 -left-4 h-16 w-16' />
			<Marigold className='top-32 left-3 h-10 w-10 [animation-direction:reverse]' />
			<Marigold className='top-16 left-10 h-8 w-8' />

			<Marigold className='bottom-6 -right-4 h-20 w-20 [animation-direction:reverse]' />
			<Marigold className='bottom-20 right-5 h-10 w-10' />
			<Marigold className='bottom-4 right-14 h-8 w-8 [animation-direction:reverse]' />

			{PETALS.map((petal, index) => (
				<svg key={petal} className={`absolute -top-6 h-5 w-3 motion-reduce:hidden ${petal}`} viewBox='0 0 12 20'>
					<path d='M6 0C11 5 12 12 6 20 0 12 1 5 6 0Z' className={index % 2 === 0 ? 'fill-orange-500' : 'fill-amber-400'} />
				</svg>
			))}

			<Calavera />

			<div className='absolute bottom-5 left-[12%] flex items-end gap-2'>
				<Candle body='h-12' delay='' />
				<Candle body='h-8' delay='[animation-delay:-0.5s]' />
				<Candle body='h-10' delay='[animation-delay:-1s]' />
			</div>
		</div>
	);
}