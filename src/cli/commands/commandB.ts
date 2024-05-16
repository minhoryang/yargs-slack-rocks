import type { Argv } from 'yargs';
import type { IContext } from '../parser';


export const command = 'commandB <command>';
export const describe = 'commandB-specific...';
export const builder = (argv: Argv) => {
  argv.commandDir('Bsubcommands')
    .demand(1)
    .strict()
    .help();
};
export const handler = (_: IContext) => {};
