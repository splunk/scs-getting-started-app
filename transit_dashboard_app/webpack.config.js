/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('@splunk/webpack-configs/base.config').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const childProcess = require('child_process');

const DEBUG = process.env.NODE_ENV !== 'production';

const index = path.resolve(__dirname, 'src', 'index.jsx');

const config = webpackMerge(baseConfig, {
    entry: index,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: `[name].js`,
    },
    devServer: {
        port: 9009,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
    },
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new HtmlWebpackPlugin({
            title: "Transit Dashboard App",
            favicon: path.join(__dirname, 'public', 'favicon.ico'),
            template: path.join(__dirname, 'public', 'template.html'),
        }),
    ],
});

if (!DEBUG) {
    const plugins = config.plugins || [];
    plugins.push(new UglifyJsPlugin({ sourceMap: true }));
    config.plugins = plugins;
}

module.exports = config;
