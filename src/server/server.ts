import express from 'express';
import bodyParser from 'body-parser';

import cliParser from '../cli/parser';
import slackWebhook from './slack_webhook_for_commands';


const _ = () => {
  const app = express();
  app.set('trust proxy', true);
  app.get('/ping', (_, res) => {
    res.json({pong: true});
  });
  if (process.env.SLACK_VERIFY_TOKEN) {
    app.use('/slack', [
      bodyParser.urlencoded({ extended: false }),
      slackWebhook(() => cliParser()),
    ]);
  }
  return app;
};

export default _;
