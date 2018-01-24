const path = require('path');

module.exports = {
  entry: {
    bvt: ['./tests/e2e/specs/cmds.spec.js'],
  },

  output: {
    path: path.resolve(__dirname, './lib/tests/e2e'),
    filename: '[name].bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      { test: /\.json$/, loader: 'json-loader' },
    ],
  },
};
