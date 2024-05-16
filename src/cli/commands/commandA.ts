import type { Argv } from 'yargs';
import type { IContext } from '../parser';


export const command = 'commandA <command>';
export const describe = 'commandA-specific...';
export const builder = (argv: Argv) => {
  argv.commandDir('Asubcommands')
    .demand(1)
    .strict()
    .help();
};
export const handler = (_: IContext) => {};
