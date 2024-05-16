import yargs from 'yargs';


const parser = () => yargs()
  .usage(`/ [command]`)
  .commandDir('commands')
  .demand(1)
  .strict()
  .help()
  .scriptName('');


export default parser;

export interface IContext {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  respond: (...data: any[]) => void;
}
