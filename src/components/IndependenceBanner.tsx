interface IndependenceBannerProps {
	darkMode: boolean;
}

const COLORES_PATRIOS = ['#006847', '#ffffff', '#ce1126'];

function IndependenceBanner({ darkMode }: IndependenceBannerProps) {
	const banderines = Array.from({ length: 20 });

	return (
		<div className='fixed top-0 left-0 w-full pointer-events-none z-40 flex justify-center overflow-hidden'>
			<svg
				viewBox='0 0 1000 60'
				className='w-full max-w-6xl h-14'
				preserveAspectRatio='none'
			>
				{/* Cuerda donde cuelgan los banderines */}
				<line
					x1='0'
					y1='2'
					x2='1000'
					y2='2'
					stroke={darkMode ? '#94a3b8' : '#475569'}
					strokeWidth='1.5'
				/>
				{banderines.map((_, i) => {
					const x = (1000 / banderines.length) * i + 10;
					const color = COLORES_PATRIOS[i % COLORES_PATRIOS.length];
					return (
						<g key={i}>
							<polygon
								points={`${x},2 ${x + 22},2 ${x + 11},34`}
								fill={color}
								opacity={0.9}
							/>
							{/* Recorte simulando papel picado */}
							<circle
								cx={x + 11}
								cy={14}
								r='2.5'
								fill={darkMode ? '#0f172a' : '#f8fafc'}
							/>
						</g>
					);
				})}
			</svg>
		</div>
	);
}

export default IndependenceBanner;