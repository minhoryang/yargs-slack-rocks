import type { Argv } from 'yargs';
import type { IContext } from '../../parser';


interface IPongContext extends IContext {
  option: string;
}

export const command = 'pong';
export const describe = 'send pong, and recv ping';
export const builder = (argv: Argv) => {
  argv.option('option', {
    type: 'string',
    default: process.env.OPTION || 'option_value',
  });
};
export const handler = (argv: IPongContext) => {
  argv.respond(`${argv.option}`);
};
