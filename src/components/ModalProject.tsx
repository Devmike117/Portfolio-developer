import { FaExternalLinkAlt, FaGithub, FaDollarSign, FaChevronLeft, FaChevronRight, FaClipboard } from 'react-icons/fa';
import type { Project } from '../types';
import { IoMdClose, IoMdCode } from 'react-icons/io';
import { useState, useEffect } from 'react';

interface Props {
	selectedProject: Project;
	setSelectedProject: (project: Project | null) => void;
}

export const ModalProject = ({
	selectedProject,
	setSelectedProject,
}: Props) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		setCurrentImageIndex(0);
	}, [selectedProject.id]);

	const images = Array.isArray(selectedProject.imageSrc)
		? selectedProject.imageSrc
		: [selectedProject.imageSrc];

	const handleNextImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev + 1) % images.length);
	};

	const handlePrevImage = (e: React.MouseEvent) => {
		e.stopPropagation();
		setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<div
			className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4'
			onClick={() => setSelectedProject(null)}
		>
			<div
				className='w-full sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 shadow-lg relative flex flex-col sm:flex-row max-h-[90vh] overflow-auto'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex-[1.5] relative group'>
					<img
						src={images[currentImageIndex]}
						alt={selectedProject.name}
						className='w-full h-full object-cover'
					/>
					
					{images.length > 1 && (
						<>
							<button
								onClick={handlePrevImage}
								className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity'
								title='Imagen anterior'
								aria-label='Imagen anterior'
							>
								<FaChevronLeft size={20} />
							</button>
							<button
								onClick={handleNextImage}
								className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity'
								title='Siguiente imagen'
								aria-label='Siguiente imagen'
							>
								<FaChevronRight size={20} />
							</button>
							<div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10'>
								{images.map((_, index) => (
									<button
										key={index}
										onClick={(e) => {
											e.stopPropagation();
											setCurrentImageIndex(index);
										}}
										className={`w-2 h-2 rounded-full transition-colors ${
											index === currentImageIndex ? 'bg-white' : 'bg-white/50'
										}`}
										title={`Imagen ${index + 1}`}
										aria-label={`Ir a imagen ${index + 1}`}
									/>
								))}
							</div>
							<div className='absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold'>
								{currentImageIndex + 1}/{images.length}
							</div>
						</>
					)}
				</div>

				<div className='p-4 py-6 bg-white dark:bg-slate-800 flex flex-col gap-4 rounded flex-[2.5] transition-colors duration-300'>
					<div className='flex justify-between items-center'>
						<h2 className='text-2xl font-bold dark:text-white'>
							{selectedProject.name}
						</h2>

						<div className='flex items-center gap-3'>
							{selectedProject.githubUrl && (
								<a
									href={selectedProject.githubUrl}
									className='ml-4 text-black dark:text-white'
									target='_blank'
									title='ver en Github'
									rel='noreferrer'
								>
									<FaGithub size={22} />
								</a>
							)}
							<a
								href={selectedProject.projectUrl}
								className='text-black dark:text-white'
								target='_blank'
								title='ver Proyecto'
								rel='noreferrer'
							>
								<FaExternalLinkAlt size={22} />
							</a>
						</div>
					</div>

					<p className='text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg flex-1 md:flex-none'>
						{selectedProject.description}
					</p>

					<div className='space-y-3'>
						<p className='font-semibold dark:text-white flex items-center gap-2'>
							<IoMdCode size={22} />
							Tecnologías Utilizadas:
						</p>

						<div className='flex flex-wrap gap-2 items-center'>
							{selectedProject.technologies.map((t, index) => (
								<span
									key={index}
									className='bg-gray-100 dark:bg-slate-700 dark:text-white rounded-full px-3 py-1 text-balance text-xs font-semibold'
								>
									{t}
								</span>
							))}
						</div>
					</div>

					{selectedProject.budget && (
						<div className='space-y-2 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800'>
							<p className='font-semibold text-green-700 dark:text-green-400 flex items-center gap-2'>
								<FaDollarSign size={20} />
								Presupuesto del Proyecto
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
								{selectedProject.budget}
							</p>
						</div>
					)}

					{selectedProject.notes && (
						<div className='space-y-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'>
							<p className='font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2'>
								<FaClipboard size={20} />
								Notas del Proyecto
							</p>
							<p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap'>
								{selectedProject.notes}
							</p>
						</div>
					)}

				</div>
			</div>

			<button
				type='button'
				className='absolute top-6 right-6 cursor-pointer'
				onClick={() => setSelectedProject(null)}
			>
				<IoMdClose size={30} className='text-white' />
			</button>
		</div>
	);
};
