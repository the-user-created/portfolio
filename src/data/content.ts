import ABOUT_DATA from './jsons/about.json';
import SKILLS_DATA from './jsons/skills.json';
import PROJECTS_DATA from './jsons/projects.json';
import CONTACT_DATA from './jsons/contact.json';
import FORTUNES_DATA from './jsons/fortunes.json';

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

export const ABOUT = ABOUT_DATA;
export const SKILLS = SKILLS_DATA;
export const PROJECTS = PROJECTS_DATA;
export const CONTACT = CONTACT_DATA;
export const FORTUNES = FORTUNES_DATA;

export const RESUME_URL = '/resume.pdf';

export const THEMES = ['default', 'hacker', 'solarized', 'light', 'matrix'];

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
