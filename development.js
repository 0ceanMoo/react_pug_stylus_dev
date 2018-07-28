import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from "extract-text-webpack-plugin"

const ast = path.resolve(__dirname, 'assets')
const pub = path.resolve(__dirname, 'public')

export default {
  mode: 'development',
  entry: `${ast}/jsx/app.jsx`,

  output: {
    path: pub,
    filename: 'js/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            'stylus-loader',
          ],
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new ExtractTextPlugin("css/styles.css"),
    new HtmlWebpackPlugin({
      template: `${ast}/pug/index.pug`,
      filename: 'index.html'
    })
  ]
}
