const path = require('path'),
      { CleanWebpackPlugin } = require('clean-webpack-plugin'),
      HTMLWebpackPlugin = require('html-webpack-plugin'),
      CopyPlugin = require('copy-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode : 'development',
    entry : "./index.js",
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@' : path.resolve(__dirname,'src'),
            '@core' : path.resolve(__dirname,'src/core')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template : 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,'src/corona.png'),
                    to: path.resolve(__dirname,'dist')
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets : ['@babel/preset-env']
                }
            }
        ],
    },
}