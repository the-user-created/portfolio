export const COMMANDS = [
    { cmd: 'help', desc: 'List available commands' },
    { cmd: 'about', desc: 'Display information about me' },
    { cmd: 'skills', desc: 'List technical skills' },
    { cmd: 'projects', desc: 'View project portfolio' },
    { cmd: 'contact', desc: 'Display contact information' },
    { cmd: 'resume', desc: 'Download resume' },
    { cmd: 'theme', desc: 'Change terminal theme (try "theme list")' },
    { cmd: 'clear', desc: 'Clear terminal screen' },
];

export const ABOUT = {
    name: 'Developer',
    role: 'Full Stack Engineer',
    bio: 'A passionate developer building web experiences with modern technologies. I love command lines, clean code, and optimizing performance.',
};

export const SKILLS = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'PostgreSQL', 'Redis'],
    tools: ['Git', 'Docker', 'Vercel', 'Linux'],
};

export interface Project {
    id: string;
    name: string;
    description: string;
    stack: string[];
    details?: string;
    link?: string;
}

export const PROJECTS: Project[] = [
    {
        id: '1',
        name: 'Terminal Portfolio',
        description: 'A React-based interactive terminal portfolio.',
        stack: ['Next.js', 'TypeScript', 'Tailwind'],
        details:
            'A fully functional terminal emulator in the browser. Features command history, theming, and a filesystem-like navigation structure.',
    },
    {
        id: '2',
        name: 'E-Commerce Dashboard',
        description: 'Real-time analytics dashboard for online stores.',
        stack: ['React', 'Node.js', 'Socket.io'],
        details:
            'Provided live sales metrics and inventory tracking using WebSockets for instant updates.',
    },
];

export const CONTACT = {
    email: 'hello@example.com',
    github: 'github.com/example',
    linkedin: 'linkedin.com/in/example',
};

export const RESUME_URL = '/resume.pdf';

export const THEMES = ['default', 'hacker', 'solarized', 'light'];
