import type { Argv } from 'yargs';
import type { IContext } from '../../parser';


interface IPingContext extends IContext {
  option: string;
}

export const command = 'ping';
export const describe = 'send ping, and recv pong';
export const builder = (argv: Argv) => {
  argv.option('option', {
    type: 'string',
    default: process.env.OPTION || 'option_value',
  });
};
export const handler = (argv: IPingContext) => {
  argv.respond(`${argv.option}`);
};
