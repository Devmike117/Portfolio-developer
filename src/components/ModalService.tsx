import { IoClose } from 'react-icons/io5';
import { HiCheckCircle, HiExclamationTriangle, HiClock } from 'react-icons/hi2';
import type { Service } from '../types';

interface Props {
	selectedService: Service;
	setSelectedService: (service: Service | null) => void;
}

export const ModalService = ({ selectedService, setSelectedService }: Props) => {
	const {
		name,
		icon: Icon,
		price,
		description,
		features,
		process,
		warnings,
		whenToUse,
		benefits,
		plans,
		estimatedTime,
	} = selectedService;

	return (
		<div
			className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4'
			onClick={() => setSelectedService(null)}
		>
			<div
				className='bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative'
				onClick={e => e.stopPropagation()}
			>
				<button
					onClick={() => setSelectedService(null)}
					className='absolute top-4 right-4 p-2 rounded-full bg-slate-200/70 dark:bg-slate-700/70 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors z-10'
					aria-label='Cerrar'
				>
					<IoClose size={22} className='text-slate-700 dark:text-slate-200' />
				</button>

				<div className='p-6 sm:p-8'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-4'>
						<div className='bg-slate-800 dark:bg-slate-700 p-4 rounded-2xl'>
							<Icon className='text-3xl text-white' />
						</div>
						<div>
							<h2 className='text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white'>
								{name}
							</h2>
							{price && (
								<p className='text-blue-600 dark:text-blue-400 font-semibold text-lg'>
									{price}
								</p>
							)}
						</div>
					</div>

					{description && (
						<p className='text-slate-600 dark:text-slate-300 leading-relaxed mb-6'>
							{description}
						</p>
					)}

					{/* Qué incluye */}
					{features && features.length > 0 && (
						<div className='mb-6'>
							<h3 className='text-lg font-bold text-slate-900 dark:text-white mb-3'>
								¿Qué incluye?
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								{features.map((f, i) => (
									<div key={i} className='flex items-start gap-3'>
										<HiCheckCircle className='text-xl text-green-600 flex-shrink-0 mt-0.5' />
										<div>
											<p className='font-semibold text-sm text-slate-900 dark:text-white'>
												{f.title}
											</p>
											<p className='text-sm text-slate-600 dark:text-slate-400'>
												{f.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Cuándo lo necesitas */}
					{whenToUse && whenToUse.length > 0 && (
						<div className='mb-6 bg-orange-50 dark:bg-blue-950/20 rounded-xl p-4'>
							<h3 className='text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2'>
								<HiExclamationTriangle className='text-xl text-orange-600' />
								¿Cuándo lo necesitas?
							</h3>
							<ul className='space-y-1 text-sm text-slate-700 dark:text-slate-300'>
								{whenToUse.map((item, i) => (
									<li key={i}>• {item}</li>
								))}
							</ul>
						</div>
					)}

					{/* Proceso */}
					{process && process.length > 0 && (
						<div className='mb-6'>
							<h3 className='text-lg font-bold text-slate-900 dark:text-white mb-3'>
								Proceso
							</h3>
							<div className='space-y-3'>
								{process.map((step, i) => (
									<div key={i} className='flex gap-3'>
										<div className='bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0'>
											{i + 1}
										</div>
										<div>
											<p className='font-semibold text-sm text-slate-900 dark:text-white'>
												{step.title}
											</p>
											<p className='text-sm text-slate-600 dark:text-slate-400'>
												{step.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Beneficios */}
					{benefits && benefits.length > 0 && (
						<div className='mb-6'>
							<h3 className='text-lg font-bold text-slate-900 dark:text-white mb-3'>
								Beneficios
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
								{benefits.map((b, i) => {
									const BenefitIcon = b.icon;
									return (
										<div key={i} className='bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center'>
											<BenefitIcon className='text-3xl mx-auto mb-2 text-blue-600 dark:text-yellow-500' />
											<p className='font-semibold text-sm text-slate-900 dark:text-white mb-1'>
												{b.title}
											</p>
											<p className='text-xs text-slate-600 dark:text-slate-400'>
												{b.description}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					)}

					{/* Advertencias */}
					{warnings && warnings.length > 0 && (
						<div className='mb-6 bg-red-50 dark:bg-red-950/30 border-l-4 border-red-400 p-4 rounded'>
							<div className='flex gap-3'>
								<HiExclamationTriangle className='text-xl text-red-600 flex-shrink-0 mt-0.5' />
								<ul className='space-y-1 text-sm text-slate-700 dark:text-slate-300'>
									{warnings.map((w, i) => (
										<li key={i}>• {w}</li>
									))}
								</ul>
							</div>
						</div>
					)}

                    {/* Planes */}
					{plans && plans.length > 0 && (
						<div className='mb-6'>
							<h3 className='text-lg font-bold text-slate-900 dark:text-white mb-3'>
								Planes disponibles
							</h3>
							<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
								{plans.map((plan, i) => (
									<div
										key={i}
										className={`rounded-xl p-4 border relative ${
											plan.recommended
												? 'border-blue-600 border-2'
												: 'border-slate-200 dark:border-slate-700'
										}`}
									>
										{plan.recommended && (
											<span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold'>
												Recomendado
											</span>
										)}
										<p className='font-bold text-slate-900 dark:text-white'>
											{plan.name}
										</p>
										<p className='text-blue-600 dark:text-blue-400 font-bold text-xl mb-1'>
											{plan.price}
										</p>
										<p className='text-xs text-slate-500 dark:text-slate-400 mb-3'>
											{plan.tagline}
										</p>
										<ul className='space-y-1'>
											{plan.items.map((item, j) => (
												<li key={j} className='flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300'>
													<HiCheckCircle className='text-green-600 flex-shrink-0 mt-0.5' />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Tiempo estimado */}
					{estimatedTime && (
						<div className='bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 flex items-center gap-3'>
							<HiClock className='text-2xl text-blue-600 flex-shrink-0' />
							<p className='text-sm text-slate-700 dark:text-slate-300'>
								<span className='font-semibold'>Tiempo estimado:</span> {estimatedTime}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
 
