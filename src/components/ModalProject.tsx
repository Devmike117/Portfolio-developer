import { FaExternalLinkAlt, FaGithub, FaDollarSign } from 'react-icons/fa';
import type { Project } from '../types';
import { IoMdClose, IoMdCode } from 'react-icons/io';

interface Props {
	selectedProject: Project;
	setSelectedProject: (project: Project | null) => void;
}

export const ModalProject = ({
	selectedProject,
	setSelectedProject,
}: Props) => {
	return (
		<div
			className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4'
			onClick={() => setSelectedProject(null)}
		>
			<div
				className='w-full sm:w-11/12 md:w-4/5 lg:w-2/3 xl:w-1/2 shadow-lg relative flex flex-col sm:flex-row max-h-[90vh] overflow-auto'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex-[1.5]'>
					<img
						src={selectedProject.imageSrc}
						alt={selectedProject.name}
						className='w-full h-full object-cover'
					/>
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
