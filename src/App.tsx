import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import {
	GridExperience,
	GridProjects,
	GridServices,
	GridSkills,
	Header,
	ModalProject,
	Navigation,
	ModalService,
	ChristmasLights,
	IndependenceBanner,
	ConfettiPatrio,
} from './components';
import { getSeasonalTheme } from './utils/seasonalTheme';
import type { Project, Service } from './types';

function App() {
	const [tabActiveIndex, setTabActiveIndex] = useState<number>(1);
	const [selectedProject, setSelectedProject] =
		useState<Project | null>(null);
	const [selectedService, setSelectedService] =
		useState<Service | null>(null);

	{/* Detectar tema estacional activo según la fecha actual */}
	const [seasonalTheme] = useState(() => getSeasonalTheme());

	{/* Iniciar el modo oscuro desde localStorage */}
	const [darkMode, setDarkMode] = useState<boolean>(() => {
		document.documentElement.classList.remove('dark');

		const saved = localStorage.getItem('darkMode');
		const isDark = saved ? JSON.parse(saved) : false;

		if (isDark) {
			document.documentElement.classList.add('dark');
		}

		return isDark;
	});

	{/* Sincronizar cambios del modo oscuro con localStorage y DOM */}
	useEffect(() => {
		localStorage.setItem('darkMode', JSON.stringify(darkMode));
		const html = document.documentElement;
		if (darkMode) {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	}, [darkMode]);

	return (
		<>
			{/* Tema navideño */}
			{seasonalTheme === 'christmas' && <ChristmasLights darkMode={darkMode} />}

			{/* Tema patrio */}
			{seasonalTheme === 'independencia' && (
				<>
					<IndependenceBanner darkMode={darkMode} />
					<ConfettiPatrio />
				</>
			)}

			<div className='bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300'>
				<main className='container py-10'>
					{/* Botón para alternar modo oscuro/claro */}
					<div className='flex justify-end mb-6'>
						<button
							onClick={() => setDarkMode(!darkMode)}
							className='p-2 rounded-full bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/70 dark:hover:bg-slate-700/70 transition-colors border border-slate-300/30 dark:border-slate-600/30'
							aria-label='Toggle dark mode'
						>
							{darkMode ? (
								<Sun size={24} className='text-yellow-500' />
							) : (
								<Moon size={24} className='text-slate-700 dark:text-slate-400' />
							)}
						</button>
					</div>

					<Header />
					<Navigation
						tabActiveIndex={tabActiveIndex}
						setTabActiveIndex={setTabActiveIndex}
					/>

					{tabActiveIndex === 1 && (
						<GridProjects setSelectedProject={setSelectedProject} />
					)}

					{tabActiveIndex === 2 && <GridExperience />}

					{tabActiveIndex === 3 && <GridSkills />}

					{tabActiveIndex === 4 && (
						<GridServices setSelectedService={setSelectedService} />
					)}

					{selectedProject && (
						<ModalProject
							selectedProject={selectedProject}
							setSelectedProject={setSelectedProject}
						/>
					)}

					{selectedService && (
						<ModalService
							selectedService={selectedService}
							setSelectedService={setSelectedService}
						/>
					)}
				</main>

				{/* Footer */}
				<footer className="w-full py-4 text-center relative z-10 backdrop-blur-lg bg-white/30 dark:bg-slate-800/30 border-t border-white/20 dark:border-slate-700/20 shadow-lg text-slate-900 dark:text-slate-100 transition-colors duration-300">
					© Devmike117.{' '}
					{new Date().toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', year: 'numeric' })}
				</footer>
			</div>
			<Analytics />
		</>
	);
}

export default App;