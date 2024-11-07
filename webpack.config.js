const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
  return {
    mode: env.mode?? 'development',
    entry: {
      main: path.resolve(__dirname, './src/index.js'),
    },
      
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contanthash].js',
        // clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'index.html' }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin({ template: 'index.html' }),
      new MiniCssExtractPlugin()
    ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
        // Images
       {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
        // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      //CSS, SCSS
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // use: ['style-loader','postcss-loader', "css-loader"],
       
      
      },
        
    ],    
    },
   resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // Додаємо src до шляху
    extensions: ['.js', '.jsx', '.json', '.css'], // Додаємо розширення, які будемо використовувати
  },
  devtool: 'source-map', // Для налагодження
  devServer: {     
    
    static: {
      directory: path.join(__dirname, ''), // Директорія для статичних файлів
    },
      hot: true, // Активує HMR     
      open: true,
      // historyApiFallback: true, 
  
      },
 
  }

 
}
