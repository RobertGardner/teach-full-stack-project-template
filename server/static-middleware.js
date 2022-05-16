const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, 'public');
const staticMiddleware = express.static(publicPath);

if (process.env.NODE_ENV !== 'development') {
  module.exports = staticMiddleware;
} else {
  const livereloadServer = require('livereload').createServer();
  livereloadServer.watch(publicPath);
  livereloadServer.server.once('connection', () => {
    setTimeout(() => livereloadServer.sendAllClients(JSON.stringify({
      command: 'reload',
      path: '/'
    })), 100);
  });
  const webpack = require('webpack')(require('../webpack.config'));
  module.exports = [
    require('connect-livereload')(),
    require('webpack-dev-middleware')(webpack),
    require('webpack-hot-middleware')(webpack),
    staticMiddleware
  ];
}
