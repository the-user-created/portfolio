import ABOUT_DATA from './jsons/about.json';
import SKILLS_DATA from './jsons/skills.json';
import PROJECTS_DATA from './jsons/projects.json';
import CONTACT_DATA from './jsons/contact.json';
import FORTUNES_DATA from './jsons/fortunes.json';
import EXPERIENCE_DATA from './jsons/experience.json';
import EDUCATION_DATA from './jsons/education.json';
import VOLUNTEER_DATA from './jsons/volunteer.json';
import AWARDS_DATA from './jsons/awards.json';
import INTERESTS_DATA from './jsons/interests.json';

export const COMMANDS = [
    { cmd: 'help', desc: 'List available commands' },
    {
        cmd: 'about',
        desc: 'Display information about me',
        synonyms: ['whoami'],
    },
    {
        cmd: 'experience',
        desc: 'Work history',
        synonyms: ['exp', 'work'],
    },
    {
        cmd: 'education',
        desc: 'Academic background',
        synonyms: ['edu'],
    },
    { cmd: 'skills', desc: 'List technical capabilities' },
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
    { cmd: 'volunteer', desc: 'Community service and volunteering' },
    { cmd: 'awards', desc: 'Honors and achievements' },
    { cmd: 'interests', desc: 'Hobbies and off-clock activities' },
    { cmd: 'contact', desc: 'Display contact information' },
    { cmd: 'resume', desc: 'Download PDF resume' },
    { cmd: 'theme', desc: 'Change terminal theme' },
    { cmd: 'clear', desc: 'Clear terminal screen', synonyms: ['cls'] },
    {
        cmd: 'exit',
        desc: 'End session and switch to standard view',
        synonyms: ['quit', 'logout'],
    },
];

export const COMMAND_SYNONYMS: { [key: string]: string } = {
    ls: 'projects',
    list: 'projects',
    cd: 'project',
    whoami: 'about',
    cls: 'clear',
    exp: 'experience',
    work: 'experience',
    edu: 'education',
    quit: 'exit',
    logout: 'exit',
};

export const ABOUT = ABOUT_DATA;
export const SKILLS = SKILLS_DATA;
export const PROJECTS = PROJECTS_DATA;
export const CONTACT = CONTACT_DATA;
export const FORTUNES = FORTUNES_DATA;
export const EXPERIENCE = EXPERIENCE_DATA;
export const EDUCATION = EDUCATION_DATA;
export const VOLUNTEER = VOLUNTEER_DATA;
export const AWARDS = AWARDS_DATA;
export const INTERESTS = INTERESTS_DATA;

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
