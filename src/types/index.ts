export interface Project {
	id: number;
	name: string;
	description: string;
	technologies: string[];
	projectUrl: string;
	githubUrl?: string;
	imageSrc: string | string[];
	budget?: string;
	notes?: string;
}
