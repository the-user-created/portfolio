import { ReactNode } from 'react';

export type LineType = 'input' | 'output' | 'error' | 'system';

export type TerminalAction =
    | { type: 'CLEAR' }
    | { type: 'SET_THEME'; payload: string }
    | { type: 'CONFIRM_DESTRUCTION' }
    | { type: 'TRIGGER_MELTDOWN' }
    | { type: 'TRIGGER_MATRIX' };

export interface TerminalLine {
    id: string;
    type: LineType;
    content: ReactNode;
    timestamp?: Date;
}

export interface CommandResponse {
    output: ReactNode;
    type?: LineType;
    action?: TerminalAction;
}

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
}
