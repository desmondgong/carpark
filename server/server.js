import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from './Home';

const app = express();

app.set('port', (process.env.PORT_WEBSERVER || 3000));

// Bundle in memory, only used for development
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack'); // eslint-disable-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
  const webpackConfig = require('../webpack.config'); // eslint-disable-line global-require
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/lib/', // Same as `output.publicPath` in most cases.
  }));
} else {
  app.use('/lib', express.static(path.join(__dirname, '../')));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/home', (req, res) => {
  /* eslint react/jsx-filename-extension: [1, { "extensions": [".js", ".jsx"] }] */
  const document = renderToString(<Home />);
  res.status(200).send(`<!DOCTYPE html>${document}`);
});

app.listen(app.get('port'), () => {
  console.log(`Server started: http://localhost:${app.get('port')}/`);
});
