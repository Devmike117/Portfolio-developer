import type { IconType } from 'react-icons';

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

export interface ServiceFeature {
	title: string;
	description: string;
}

export interface ServiceStep {
	title: string;
	description: string;
}

export interface ServiceBenefit {
	title: string;
	description: string;
	icon: IconType;
}

export interface ServicePlan {
	name: string;
	price: string;
	tagline: string;
	items: string[];
	recommended?: boolean;
}

export interface Service {
	id: number;
	name: string;
	icon: IconType;
	price?: string;
	description?: string;
	features?: ServiceFeature[];
	process?: ServiceStep[];
	warnings?: string[];
	whenToUse?: string[];
	benefits?: ServiceBenefit[];
	plans?: ServicePlan[];
	estimatedTime?: string;
}
