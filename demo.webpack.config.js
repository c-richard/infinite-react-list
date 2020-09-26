const path = require('path');

module.exports = {
  entry: './demo/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'demo/'),
    publicPath: '/demo/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './demo',
  },
};
