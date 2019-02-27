const helpers  = require('./helpers');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const isDevelopment = process.env.NODE_ENV.trim() !== 'production';
const glob = require('glob');
console.log(isDevelopment);
module.exports = {
    entry: {
        vendor: './src/angular/vendor.ts',
        polyfills: './src/angular/polyfills.ts',
        angular: isDevelopment ? './src/angular/main.ts' : './src/angular/main.aot.ts',
        main:'./src/main.js',
        landing: './src/templates/landing/landing.js',
        page: './src/templates/page/page.js'
    } ,
    output: {
        path: helpers.root('dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            Widgets: helpers.root('src/widgets'),
            Assets: helpers.root('src/assets'),
        }
    },
    devtool: isDevelopment && "source-map",
    devServer: {
        port: 3000,
        open: true,
        contentBase:helpers.root("src"),
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {   test: /\.hbs$/,
                loader: "handlebars-loader",
                options: {
                    partialDirs: [helpers.root("src")].concat(glob.sync('**/', { cwd: helpers.root("src"), realpath: true }))
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
                            outputPath: 'assets/fonts',
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
                            outputPath: 'assets/img',
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
            },
            {
                // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
                // Removing this will cause deprecation warnings to appear.
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },  // enable SystemJS
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(helpers.root('dist'), { root: helpers.root(), verbose: true } ),
        // Workaround for Critical dependency
        // The request of a dependency is an expression in ./node_modules/@angular/core/fesm5/core.js
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            helpers.root('src'),
            {}
        ),
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
            chunks: ['polyfills','vendor','angular','main','page'],
            minify: !isDevelopment && {
                html5: true
            },
        })
    ]
};