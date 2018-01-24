const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/index.jsx',
    _common: [
      'react-dom', 'redux', 'react-redux', 'redux-thunk',
    ],
  },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: '[name].Bundle.js',
    publicPath: '/lib/',
    sourceMapFilename: '[name].Bundle.map',
  },
  devtool: process.env.NODE_ENV !== 'production' ? '#source-map' : false,
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ['es2015', 'react'] } },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, exclude: /node_modules\/(?!ess-*)/, loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
      { test: /\.svg$/, exclude: /node_modules\/(?!ess-*)/, loader: 'babel-loader?presets[]=es2015&presets[]=react!svg-react-loader' },
      { test: /\.(png|gif)$/, exclude: /node_modules\/(?!ess-*)/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'html' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: '_common',
    }),
  ],
};
