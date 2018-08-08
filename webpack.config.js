var path = require('path');

module.exports = (env, argv) => ({
  entry: {
    app: ['babel-polyfill', 'whatwg-fetch', './src/index.js', './src/less/app.less'],
    vendor: ['babel-polyfill', 'react', 'react-dom']
  },
  resolve: {
    alias: {
      common: __dirname + "/src/js/common"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      }, {
        test: /\.(woff2?|eot|svg|ttf|md|jpg|png)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              publicPath: '/compiled/'
            }
          }
        ]
      }
    ]
  },
  output: {
      filename: '[name].min.js',
      path: __dirname + '/dist/compiled',
      chunkFilename: '[name].min.js',
      publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    },
    runtimeChunk: true
  }
});