import { argv } from 'node:process';

import { hideBin } from 'yargs/helpers';

import parser from './src/cli/parser';
import type { IContext } from './src/cli/parser';
import * as run_server from './src/cli/run_server';
import type { IRunServerContext } from './src/cli/run_server';


if (require.main === module) {
  const _ = parser();
  _.option('emulator', {
    alias: 'e',
    type: 'boolean',
    description: 'Run with emulator',
    default: !!process.env.IS_EMULATOR,
  });
  // NOTE: run_server is only for local.
  _.command<IRunServerContext>(run_server.command, run_server.describe, run_server.builder, run_server.handler);
  const _context: IContext = {
    respond: console.log,
  };
  _.parse(hideBin(argv), _context, (err, _argv, output) => {
    if (output) console.log(output);
    if (err) {
      if (err.name !== 'YError') console.error(err.message);
    }
  });
}
