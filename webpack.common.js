const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './app.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    devServer: {
        open: true,
        historyApiFallback: true // 在使用单页面应用的时候，需要设置此参数，代表如果访问除根路径以外的地址，最终都会转向去请求根路径。
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader, //分离出css引入
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { 
                    cacheDirectory: true,
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].[hash].css',
            chunkFilename: process.env.NODE_ENV === 'development' ? '[id].css' : '[id].[hash].css'
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: '',
            template: path.resolve(__dirname, './public/index.html')
        })
    ]
}