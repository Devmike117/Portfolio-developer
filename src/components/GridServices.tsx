import { services } from '../constants';
import type { Service } from '../types';

interface Props {
	setSelectedService: (service: Service | null) => void;
}

export const GridServices = ({ setSelectedService }: Props) => {
	return (
		<section className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5'>
			{services.map(service => (
				<div
					key={service.id}
					onClick={() => setSelectedService(service)}
					className='flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-gray-700 relative group overflow-hidden transition-all duration-300 hover:border-white cursor-pointer'
				>
					<div className='absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 z-10' />

					<service.icon className='size-10 text-gray-800 dark:text-gray-200 relative z-20 transition-transform duration-300 group-hover:scale-110 group-hover:text-white' />

					<p className='text-sm font-bold text-center relative z-20 text-gray-800 dark:text-gray-200 group-hover:text-white'>
						{service.name}
					</p>
				</div>
			))}
		</section>
	);
};