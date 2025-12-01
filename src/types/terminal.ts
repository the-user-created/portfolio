import { ReactNode } from 'react';

export type LineType = 'input' | 'output' | 'error' | 'system';

export interface TerminalLine {
  id: string;
  type: LineType;
  content: ReactNode;
  timestamp?: Date;
}

export interface CommandResponse {
  output: ReactNode;
  type?: LineType;
}
