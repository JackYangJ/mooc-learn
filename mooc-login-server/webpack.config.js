
const path = require('path');
const nodeExternals = require('webpack-node-externals');
debugger;
const webpackConfig = {
 entry: './index.js',
 output: {
  filename: 'bundle.js'
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
 mode: 'development',
 devtool: 'eval-source-map',
 externalsPresets: { node: true },
 node: {
  global: true,
  __filename: true,
  __dirname: true
 }
}


module.exports = webpackConfig