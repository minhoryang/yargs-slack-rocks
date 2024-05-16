// NOTE: https://github.com/yargs/pirate-joe

import { Request, Response } from 'express';
import { Argv } from 'yargs';


function buildResponder(inputMsg: string, responseUrl: string) {
  let inputSent = false;
  return function (msg: string) {
    let blocks = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `\`\`\`${msg}\`\`\``,
        }
      },
    ];
    if (!inputSent) {  // NOTE: I don't know why in_channel isn't working.
      inputSent = true;
      blocks = [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Requested: \` ${inputMsg} \``,
          }
        },
        ...blocks,
      ];
    }
    return fetch(responseUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "response_type": "in_channel",
        "blocks": blocks,
      }),
    })
      .then(async (res) => {
        if (res && res.status >= 400) {
          console.error(`invalid response = ${res.status}`)
          console.error(await res.text());
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

const _ = (parser: () => Argv) => (req: Request, res: Response) => {
  const context = Object.assign({}, req.body);

  // slack secret token must be provided.
  if (!req.body || req.body.token !== process.env.SLACK_VERIFY_TOKEN) {
    return res.sendStatus(401);
  }
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  // provides a respond function that any yargs
  // command can use to respond to Slack.
  context.respond = buildResponder(req.body.text, req.body.response_url);

  // run the yargs parser on the inbound slack command.
  parser().parse(req.body.text || '', context, (err, argv, output) => {
    if (err && err.name !== 'YError') {
      console.error(err.message);
    }
    if (output) (argv.respond as CallableFunction)(output);
  });
  res.end();
}

export default _;
