import type { Argv } from 'yargs';
import type { IContext } from './parser';

import server from '../server/server';


export interface IRunServerContext extends IContext {
  port: number;
}

export const command = 'run_server';
export const describe = 'Run server daemon for this <region> with <key> on <port>';
export const builder = (argv: Argv) => {
  argv.option('port', {
    type: 'number',
    default: process.env.PORT ? parseInt(process.env.PORT || '') : 3000,
  });
};
export const handler = (argv: IRunServerContext) => {
  const port = argv.port;

  server().listen(port);
  argv.respond(`listen on :${port}`);
};
