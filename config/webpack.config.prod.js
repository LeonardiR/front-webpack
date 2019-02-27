'use strict';
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const ngw = require('@ngtools/webpack');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
        ]
    },

    plugins: [
        new ngw.AngularCompilerPlugin({
            tsConfigPath: helpers.root('src/angular/tsconfig.aot.json'),
            entryModule: helpers.root('src', 'angular', 'form.module#FormModule')
        })
    ]

});