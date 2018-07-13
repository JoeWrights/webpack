# webpack
webpack学习笔记（基于webpack4.0）

![webpack](http://paav7duuk.bkt.clouddn.com/weback.jpg)
>webpack是一个打包(build)工具，为什么要打包呢？因为现在的前端已经不是常规的(落后的)开发方式（jquery、html、css）交给后端上线，现在是MVVM的开发时代，一切皆可打包

- webpack 将现代js开发中的各种新型有用技术，集合打包，这些东西在打包前是无法运行的，（js、es6、stylus不支持浏览器直接执行，`.hbs`、`.vue`）在目标容器上运行
- 在webpack里，一切皆静态资源，webpack将静态资源打包 => 目标文件（可运行）

## 安装webpack及webpack-cli

```
yarn global add webpack webpack-cli
```
- 新建项目文件，进入项目初始化生成package.json配置文件

  ```
  npm init -y
  ```
- 修改package.json

  ```
   "scripts": {
    "build": "webpack --mode production"
  }
  ```
- 新建webpack.config.js文件(**面试常考**：手写webpack配置文件)

  ```js
  const path = require('path');
  //webpack怎么抽离打包css的代码？ExtractTextPlugin
  const ExtractTextPlugin = require('extract-text-webpack-plugin');
  //webpack中的html的plugin做的什么事情？ 
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const webpack = require('webpack');
  console.log(__dirname); //D:\workspace\webpack\try-webpack
  console.log(path.resolve(__dirname, 'dist')); //D:\workspace\webpack\try-webpack\dist
  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [{
        // 模块规则（配置 loader、解析器等选项）
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      }, {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src') //只处理src目录下的文件
        ],
        use: 'babel-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader'
        }]
      }, {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      }]
    },
    resolve: { //resolve定义一个别名
      alias: {
        utils: path.resolve(__dirname, 'src/utils')
      },
      extensions: ['.js', '.json', '.css', '.less']
    },
    plugins: [
      new HtmlWebpackPlugin({
        file: 'index.html',
        template: 'src/index.html'
      }),
      new ExtractTextPlugin('[name].css'),
      new CopyWebpackPlugin([{
        from: 'src/assets/favicon.ico',
        to: 'favicon.ico'
      }]),
      //lodash作为工具，是很多组件会使用的，省去了到处import
      new webpack.ProvidePlugin({
        '_': 'lodash'
      })
    ],
    devServer: {
      port: '1314',
      before(app) {
        app.get('/api/test.json', (req, res) => { //如果前端用axios请求这个接口，就会返回下面的json
          res.json({
            code: 200,
            message: 'hello world'
          })
        })
      }
    }
  };
  ```
从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是高度可配置的。在开始前你需要先理解四个 **核心概念**：
  - 入口(entry)：来指定一个入口起点（或多个入口起点）。默认值为 `./src`。
  - 输出(output)：指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。
  - loader：loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
  - 插件(plugins)：loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。
  >想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。


  例如：

  ```js
   plugins: [
    new HtmlWebpackPlugin({
      file: 'index.html',
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([{
      from: 'src/assets/favicon.ico',
      to: 'favicon.ico'
    }]),
    //lodash作为工具，是很多组件会使用的，省去了到处import
    new webpack.ProvidePlugin({
      '_': 'lodash'
    })
  ]
  ```

  [这里是webpack官网的提供的一些插件列表](https://www.webpackjs.com/plugins/)
  
**注意：** **loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。**
面试常考：vue-cli在创建项目的过程中发生了什么？
