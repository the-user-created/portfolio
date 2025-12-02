export const COMMANDS = [
    { cmd: 'help', desc: 'List available commands' },
    {
        cmd: 'about',
        desc: 'Display information about me',
        synonyms: ['whoami'],
    },
    { cmd: 'skills', desc: 'List technical skills' },
    {
        cmd: 'projects',
        desc: 'View project portfolio',
        synonyms: ['ls', 'list'],
    },
    {
        cmd: 'project',
        desc: 'Shows details for a specific project',
        synonyms: ['cd'],
    },
    { cmd: 'contact', desc: 'Display contact information' },
    { cmd: 'resume', desc: 'Download resume' },
    { cmd: 'theme', desc: 'Change terminal theme (try "theme list")' },
    { cmd: 'open', desc: 'Open a resource (e.g., github, linkedin)' },
    { cmd: 'matrix', desc: 'Wake up, Neo...' },
    { cmd: 'clear', desc: 'Clear terminal screen', synonyms: ['cls'] },
];

export const COMMAND_SYNONYMS: { [key: string]: string } = {
    ls: 'projects',
    list: 'projects',
    cd: 'project',
    whoami: 'about',
    cls: 'clear',
};

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
    github?: string;
}

export const PROJECTS: Project[] = [
    {
        id: '1',
        name: 'Terminal Portfolio',
        description: 'A React-based interactive terminal portfolio.',
        stack: ['Next.js', 'TypeScript', 'Tailwind'],
        details:
            'A fully functional terminal emulator in the browser. Features command history, theming, and a filesystem-like navigation structure.',
        github: 'https://github.com/the-user-created/portfolio',
    },
    {
        id: '2',
        name: 'E-Commerce Dashboard',
        description: 'Real-time analytics dashboard for online stores.',
        stack: ['React', 'Node.js', 'Socket.io'],
        details:
            'Provided live sales metrics and inventory tracking using WebSockets for instant updates.',
        link: 'https://demo.example.com/dashboard',
        github: 'https://github.com/example/dashboard',
    },
];

export const CONTACT = {
    email: 'hello@example.com',
    github: 'github.com/example',
    linkedin: 'linkedin.com/in/example',
};

export const RESUME_URL = '/resume.pdf';

export const THEMES = ['default', 'hacker', 'solarized', 'light', 'matrix'];

export const FORTUNES = [
    'A bug in the code is worth two in the documentation.',
    'It works on my machine.',
    "There are 10 types of people in the world: those who understand binary, and those who don't.",
    'Deleted code is debugged code.',
    'Computers make very fast, very accurate mistakes.',
    "One man's constant is another man's variable.",
    'Real programmers count from 0.',
];

export const ASCII_CAT = `
  /\\_/\\  (
 ( ^.^ ) _)
   \\"/  (
 ( | | )
(__d b__)
`;

export const ASCII_HELLO = `
  _          _ _
 | |__   ___| | | ___
 | '_ \\ / _ \\ | |/ _ \\
 | | | |  __/ | | (_) |
 |_| |_|\\___|_|_|\\___/
`;
