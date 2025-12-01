import { ReactNode } from 'react';

export type LineType = 'input' | 'output' | 'error' | 'system';

export type TerminalAction =
    | { type: 'CLEAR' }
    | { type: 'SET_THEME'; payload: string }
    | { type: 'CONFIRM_DESTRUCTION' }
    | { type: 'TRIGGER_MELTDOWN' };

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
