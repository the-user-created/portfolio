import { CommandResponse } from '@/types/terminal';

export const processCommand = (input: string): CommandResponse => {
  const command = input.trim().toLowerCase();

  if (!command) {
    return { output: null, type: 'input' }; // Empty enter
  }

  switch (command) {
    case 'help':
      return {
        output: (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-blue-400">Available commands:</span>
            <ul className="list-none pl-4">
              <li>
                <span className="text-yellow-400">help</span> - Display this
                help message
              </li>
            </ul>
            <span className="mt-2 text-zinc-500 italic">
              (More commands coming soon...)
            </span>
          </div>
        ),
      };
    default:
      return {
        output: `command not found: ${command}. Type 'help' for assistance.`,
        type: 'error',
      };
  }
};
