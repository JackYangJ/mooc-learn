const { merge } = require('webpack-merge');

const baseWebpackConfig = require('./webpack.config.base');
const TerserPlugin = require("terser-webpack-plugin");

// // Can be async
// const minify = (input, sourceMap, minimizerOptions, extractsComments) => {
//   // The `minimizerOptions` option contains option from the `terserOptions` option
//   // You can use `minimizerOptions.myCustomOption`

//   // Custom logic for extract comments
//   // const { map, code } = require("uglify-module") // Or require('./path/to/uglify-module')
//   //   .minify(input, {
//   //     /* Your options for minification */
//   //   });
//   console.log('map', map)
//   return { map: false, warnings: [], errors: [], extractedComments: [] };
// };

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  stats: {children: false, warnings: false},
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          format: {
            comments: false,
            beautify: false
          },
          mangle: true
        }
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
      },
    }
  }
})


module.exports = webpackConfig;