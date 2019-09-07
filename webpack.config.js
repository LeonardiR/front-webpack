const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const isDevelopment = process.env.NODE_ENV.trim() !== 'production';
const glob = require('glob');
module.exports = {
    entry: {
        main:'./src/main.js',
        landing: './src/templates/landing/landing.js',
        page: './src/templates/page/page.js',
        charts: './src/templates/charts/charts.js',
    } ,
    externals: {
        googleCharts: 'google.charts',
        googleVisualization: 'google.visualization'

    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        alias: {
            Widgets: path.resolve(__dirname, 'src/widgets'),
            Wcomponents: path.resolve(__dirname, 'src/web-components'),
            Assets: path.resolve(__dirname, 'src/assets')
        },
        extensions: [".ts", ".tsx", ".js"]
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
                test: /\.m?js$/,
                exclude: /node_modules\/(?!(load-google-maps-api|@webcomponents\/shadycss|lit-html|lit-element|pwa-helpers|@polymer|@vaadin|@lit)\/).*/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                        presets: [
                            ['@babel/preset-env',{
                                useBuiltIns: "usage",
                                corejs: 3,
                            }],
                            '@babel/preset-react'
                        ],
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                    },
                ],
                exclude: [/node_modules/]
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
                                browsers: ["last 2 versions"]
                            },
                            sourceMap: isDevelopment,
                            plugins: () => [
                                autoprefixer({ grid: true }),
                                cssnano({ preset: 'default' })
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
                test: /\.(woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets',
                            useRelativePath: true
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets',
                            useRelativePath: true
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
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
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
            chunks: ['main','landing'],
            minify: !isDevelopment && {
                html5: true
            },
        }),
        new HtmlWebpackPlugin({
            title: 'This is a avergage Page',
            filename: 'page/index.html',
            template: './src/templates/page/t-page.hbs',
            chunks: ['main','page'],
            minify: !isDevelopment && {
                html5: true
            },
        }),
        new HtmlWebpackPlugin({
            title: 'Charts examples',
            externals:'https://www.gstatic.com/charts/loader.js',
            filename: 'charts/index.html',
            template: './src/templates/charts/t-charts.hbs',
            chunks: ['main','charts'],
            minify: !isDevelopment && {
                html5: true
            },
        })
    ]
};