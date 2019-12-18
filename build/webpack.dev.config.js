const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  /* 入口 */
  entry: {
    app: [
      path.join(__dirname, '../src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  mode: 'development',
  /* 输出到 dist 目录，输出文件名字为 bundle.js */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  /* src 目录下面的以.js结尾的文件，要使用babel解析 */
  /* cacheDirectory 是用来缓存编译结果，下次编译加速 */
  module: {
    rules: [
      {
        test: /\.js$/, 
        use: ['babel-loader?cacheDirectory=true'],
        include:  path.join(__dirname, '../src')
      },
      {
        test: /\.css$/,
        // 提取 css 文件
        use: [{loader: MiniCssExtractPlugin.loader}, {
          loader:'css-loader',
          options: {
            modules: {
              localIdentName: '[local]--[hash:base64:5]'
            }
          }
        }, 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },

  // webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true, // gzip 压缩
    host: '0.0.0.0', // 允许 ip 访问
    hot: true, // 热更新
    historyApiFallback: true, // 解决启动后刷新 404
    port: 8000, // 端口
    proxy: {
      // 配置服务代理
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: {'^/api': ''}, // 可转换
        changeOrigin: true
      }
    }
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      pages: path.join(__dirname, '../src/pages'),
      components: path.join(__dirname, '../src/components'),
      router: path.join(__dirname, '../src/router'),
      actions: path.join(__dirname, '../src/redux/actions'),
      reducers: path.join(__dirname, '../src/redux/reducers'),
      images: path.join(__dirname, '../src/images')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({ // 压缩 css
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    })
  ]
}