export interface ProjectImage {
    src: string;
    alt: string;
    caption: string;
}

export interface Project {
    id: string;
    name: string; // Short name for list view
    title: string; // Full formal title
    description: string; // Short summary
    stack: string[];
    overview: string;
    objectives?: string[];
    details?: string;
    challenges?: string;
    results?: string;
    images?: ProjectImage[];
    reportUrl?: string;
    github?: string;
    link?: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
}
