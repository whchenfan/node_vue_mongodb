var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path');
module.exports =[{
      entry: './src/index.js',
      output: {
        filename: './src/js/build.js',
      },
      resolve:{//引入vue
        alias: {
            vue: 'vue/dist/vue.js'
        }
      },
      module:{ 
        rules: [ 
          {
            test: /\.jsx?$/,
            use: [ 'babel-loader', ],
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif)$/,
            use:['url-loader',]
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader', ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      }
},
  {
      entry: './src/admin/index.js',
      output: {
        filename: './src/admin/admin.js',
      },
      resolve:{//引入vue
        alias: {
            vue: 'vue/dist/vue.js'
        }
      },
      module:{ 
        rules: [ 
          {
            test: /\.jsx?$/,
            use: [ 'babel-loader', ],
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            query: {
               limit:8192//图片大小 
             },
          },
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader', ],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      }
  }

]

/*
      ,
  
*/
