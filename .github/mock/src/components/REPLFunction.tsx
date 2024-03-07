export interface REPLFunction {
  (args: Array<string>): Promise<String | String[][]>;
}

export const commandRegistry: Record<string, REPLFunction> = {};

export function registerCommand(name: string, fn: REPLFunction): void {
  commandRegistry[name] = fn;
}

export async function executeCommand(
  input: string
): Promise<String | String[][]> {
  const [commandName, ...args] = input.split(" ");
  if (commandName in commandRegistry) {
    return commandRegistry[commandName](args);
  } else {
    return `Command not found: ${commandName}`;
  }
}
