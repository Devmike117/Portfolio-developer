import { useMemo } from 'react';

const COLORES_PATRIOS = ['#006847', '#ffffff', '#ce1126'];

function ConfettiPatrio() {
	const piezas = useMemo(
		() =>
			Array.from({ length: 40 }).map((_, i) => ({
				id: i,
				left: Math.random() * 100,
				delay: Math.random() * 8,
				duration: 6 + Math.random() * 6,
				color: COLORES_PATRIOS[i % COLORES_PATRIOS.length],
				size: 6 + Math.random() * 6,
			})),
		[]
	);

	return (
		<div className='fixed inset-0 pointer-events-none z-30 overflow-hidden'>
			{piezas.map((p) => (
				<span
					key={p.id}
					className='absolute top-[-5%] rounded-sm animate-confetti-fall'
					style={{
						left: `${p.left}%`,
						width: p.size,
						height: p.size,
						backgroundColor: p.color,
						animationDelay: `${p.delay}s`,
						animationDuration: `${p.duration}s`,
					}}
				/>
			))}
		</div>
	);
}

export default ConfettiPatrio;