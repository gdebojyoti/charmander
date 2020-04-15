const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const sourceDirectory = path.resolve(__dirname, '../src')
const publicDirectory = path.resolve(__dirname, '../public')

const config = {
  mode: 'development',
  entry: sourceDirectory + '/app.js',
  output: {
    path: publicDirectory,
    filename: 'bundle-[name].[hash:8].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'],
    alias: {
      actions: path.resolve(sourceDirectory, 'actions'),
      assets: path.resolve(sourceDirectory, 'assets'),
      components: path.resolve(sourceDirectory, 'components'),
      constants: path.resolve(sourceDirectory, 'constants'),
      data: path.resolve(sourceDirectory, 'data'),
      models: path.resolve(sourceDirectory, 'models'),
      pages: path.resolve(sourceDirectory, 'pages'),
      reducers: path.resolve(sourceDirectory, 'reducers'),
      services: path.resolve(sourceDirectory, 'services'),
      store: path.resolve(sourceDirectory, 'store'),
      stylesheets: path.resolve(sourceDirectory, 'stylesheets'),
      utilities: path.resolve(sourceDirectory, 'utilities')
    }
  },
  devServer: {
    // inline: true,
    port: 31291,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|webp)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: sourceDirectory + '/index.html',
      filename: 'index.html' // relative to root of the application
    }),
    new MiniCssExtractPlugin({
      filename: 'css-[name].[hash:8].css',
      chunkFilename: 'csschunk-[name].bundle.css'
    }),
    new CopyPlugin([
      { from: `${sourceDirectory}/assets`, to: `${publicDirectory}/assets` }
    ])
  ]
}

module.exports = config
