import { projects } from '../constants';
import type { Project } from '../types';

interface Props {
	setSelectedProject: (project: Project | null) => void;
}

export const GridProjects = ({ setSelectedProject }: Props) => {
	const getFirstImage = (imageSrc: string | string[]): string => {
		return Array.isArray(imageSrc) ? imageSrc[0] : imageSrc;
	};

	const hasMultipleImages = (imageSrc: string | string[]): boolean => {
		return Array.isArray(imageSrc) && imageSrc.length > 1;
	};

	return (
		<section className='grid grid-cols-3 gap-2'>
			{/* espacio para no estar junto con Proyectos */}
			<div className='col-span-3 h-4' />
			{projects.map(project => (
				<div
					className='flex flex-col gap-2 cursor-pointer relative group'
					onClick={() => setSelectedProject(project)}
					key={project.id}
				>
					<div className='overflow-hidden relative'>
						<div className='flex items-center justify-center inset-0 absolute transition-all duration-300 group-hover:bg-black/60 z-10'>
							<p className='text-balance text-center text-white text-xl font-bold hidden group-hover:block'>
								{project.name}
							</p>
						</div>
						<img
							src={getFirstImage(project.imageSrc)}
							alt={project.name}
							className='object-cover w-full h-64 md:h-[350px] lg:h-[500px]'
						/>
						{hasMultipleImages(project.imageSrc) && (
							<div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20'>
								{(Array.isArray(project.imageSrc) ? project.imageSrc : [project.imageSrc]).map((_, index) => (
									<div
										key={index}
										className='w-1.5 h-1.5 rounded-full bg-white/70'
									/>
								))}
							</div>
						)}
					</div>
				</div>
			))}
		</section>
	);
};
