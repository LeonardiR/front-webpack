const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const isDevelopment = process.env.NODE_ENV !== 'production';
const glob = require('glob');
module.exports = {
    entry: {
        landing: './src/templates/landing/landing.js',
        page: './src/templates/page/page.js'
    } ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        alias: {
            Widgets: path.resolve(__dirname, 'src/widgets'),
            Assets: path.resolve(__dirname, 'src/assets')
        }
    },
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        open: true,
        contentBase: path.join(__dirname, "/src"),
    },
    module: {
        rules: [
            {   test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    partialDirs: [path.resolve(__dirname, 'src')].concat(glob.sync('**/', { cwd: path.resolve(__dirname, 'src'), realpath: true }))
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            autoprefixer: {
                                browsers: ["last 2 versions"],
                                grid: true
                            },
                            sourceMap: isDevelopment,
                            plugins: () => [
                                autoprefixer
                            ]
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'dist',
                            useRelativePath: true,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                handlebarsLoader: {}
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "[id].css"
        }),

        new HtmlWebpackPlugin({
            title: 'This is the landing',
            filename: 'index.html',
            template: './src/templates/landing/t-landing.hbs',
            chunks: ['landing'],
            minify: !isDevelopment && {
                html5: true
            },
        }),
        new HtmlWebpackPlugin({
            title: 'This is a avergage Page',
            filename: 'page/index.html',
            template: './src/templates/page/t-page.hbs',
            chunks: ['page'],
            minify: !isDevelopment && {
                html5: true
            },
        })
    ]
};