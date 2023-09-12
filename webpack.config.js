const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        clean: true,
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 8086,
        client: {
            overlay: false,
        },
        devMiddleware: {
            mimeTypes: {
                md: 'text/html',
                tif: 'image/png',
            },
        }
    },
    module: {
        rules: [
            {
                test: /.(png|jpg|jpeg|gif|tif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './public/', to: 'public' },
            ]
        }),
    ],
}