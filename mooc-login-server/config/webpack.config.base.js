
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const utils = require('./utils');

const webpackConfig = {
 entry: {
  server: path.join(utils.APP_PATH, 'index.js')
 },
 output: {
  filename: 'bundle.js',
  path: utils.DIST_PATH
 },
 module: {
  rules: [
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: [path.join(__dirname, '/node_modules')]
    }
  ]
 },
 externals: [nodeExternals()],
 plugins: [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') ? "'production'" : "'development'"
    }
  })
 ],
 externalsPresets: { node: true },
 node: {
    global: true,
    __filename: true,
    __dirname: true
 }
}


module.exports = webpackConfig