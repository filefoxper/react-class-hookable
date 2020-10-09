const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pathBuilder = require('path');

const entryPath = pathBuilder.resolve('src', 'index.ts');

const targetPath = pathBuilder.resolve('dist');

const reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react',
};

const reactDOMExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
};

function entry() {
    return {
        externals: {
            'react': reactExternal,
            'react-dom': reactDOMExternal
        },
        mode: 'production',
        devtool: false,
        entry: {
            ['react-class-hookable']: entryPath,
            ['react-class-hookable.min']: entryPath
        },
        output: {
            path: targetPath,
            filename: '[name].js',
            library: 'react-class-hookable',
            libraryTarget: 'umd'
        },
        optimization: {
            noEmitOnErrors: true,
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    include: /\.min\.js$/
                }),
            ],
            namedChunks: true
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.json', 'txt']
        },
        module: {
            rules: [
                {
                    test: /\.js$|\.ts$|\.tsx$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                                plugins: [
                                    ["@babel/plugin-transform-runtime"],
                                    ['@babel/plugin-proposal-export-namespace-from'],
                                    [
                                        '@babel/plugin-proposal-class-properties',
                                        {loose: true},
                                    ]
                                ],
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            modules: false,
                                            targets: {
                                                "browsers": ["last 2 versions", "ie >=9"]
                                            }
                                        }
                                    ],
                                    '@babel/preset-react'
                                ]
                            }
                        },
                        "ts-loader"
                    ]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    }
}

module.exports = function (env) {
    return entry();
};
