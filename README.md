
node 8.11.2
webpack 4.16.3

```
yarn init -y
mkdir assets
mkdir assets/css
mkdir assets/jsx
mkdir assets/pug

mkdir public
mkdir public/js
mkdir public/css
```

## React
```
yarn add react react-dom
```

```
vi assets/jsx/app.jsx
import React from "react"
import {render} from "react-dom"

class App extends React.Component {
  render() {
    return(
      <p> Hello React!</p>
    )
  }
}

render(
  <App/>,
  document.getElementById('app')
);
```

## Babel
```
yarn add -D babel-core babel-loader babel-preset-env babel-preset-react
```

```
vi .babelrc
{
  "presets": [
    "env", "react"
  ]
}
```

## pug
```
yarn add -D pug pug-loader
```

```
vi assets/pug/index.pug
doctype html
html
  head
    title React + pug + stylus
  body
    h1 Index
    #app
```



## Webpack
```
yarn add -D webpack webpack-cli html-webpack-plugin
```

```
touch webpack.config.js development.js
vi webpack.config.js
require('babel-core/register'); // development.jsでES6を使えるようにする
module.exports = require('./development');
```

```
vi development.js
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      //template: `${ast}/index.html`,
      template: `${ast}/pug/index.pug`,
      filename: 'index.html'                // output時はファイル名、サーバ時はURLのパスになる
    })
  ]
}
```

## 確認
```
yarn webpack
```

↓が生成されているハズ

public/index.html
public/js/bundle.js


## webpack-dev-serverをインストール
webサーバを立ち上げて動作確認しながら開発できる
ソースコードの更新を検知し、自動でビルドし直してくれて、ブラウザも再読み込みしてくれて便利

```
yarn add -D webpack-dev-server
```

localhost:8080 でアクセスしてみると、index.pugで書いた内容とapp.jsxで書いたreact処理が表示されてるハズ



## CSS(stylus)
CSSまわりは割と面倒

```
yarn add -D stylus stylus-loader style-loader css-loader
yarn add -D extract-text-webpack-plugin@4.0.0-beta.0
```

extract-text-webpack-plugin はCSSファイルを出力するために必要
@4.0.0-beta.0 はwebpack4の場合に必要（古いextract-text-webpack-pluginだと動かない）

```
vi assets/css/app.styl
h1
  color: red
p
  font-size: 1.5rem
```

```
vi assets/jsx/app.jsx
import css from '../css/app.styl' // 追記
```

```
vi development.js
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from "extract-text-webpack-plugin" // 追記

        loader: 'babel-loader'
      },
      // ここから追記
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
      // ここまで
      {
        test: /\.pug$/,

  plugins: [
    new ExtractTextPlugin("css/styles.css"),  // 追記
    new HtmlWebpackPlugin({
```

## 確認
```
yarn webpack
```

public/css/styles.cssが生成されてればOK

```
vi package.json

  // 追記
  },
  "scripts": {
    "server": "webpack-dev-server"
  }
```

```
yarn server
```

h1要素が赤い文字で、p要素が大きめに表示されてたら成功

