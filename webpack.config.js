const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin=require('copy-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: "./src/javascripts/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "script/bundle.js"
    },
    module: {
        rules: [{
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: '$'
            },{
                loader: 'expose-loader',
                options: 'jQuery'
            }]
        },
        { //配置iconfont文件的包
            test: /\.(woff|svg|eot|ttf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }, 
        { //加载css
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        { //配置图片文件的包
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: 'images/[name].[ext]'
            },
        }

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({

            filename: "index1.html",
            template: './src/index1.html',
            chunks: ["index", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({

            filename: "datails.html",
            template: './src/datails.html',
            chunks: ["index", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({

            filename: "cartlist.html",
            template: './src/cartlist.html',
            chunks: ["index", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({


            filename: "login.html",
            template: './src/login.html',
            chunks: ["index", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({

            filename: "registry.html",
            template: './src/registry.html',
            chunks: ["index", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({

            filename: "dressindex.html",
            template: './src/dressindex.html',
            chunks: ["index", "vendor"],
            minify: {
                removeComment: true,
                collapseWhitespace: true
            }
        }),
        // new CopyPlugin([
        //     { from: './src/fonts', to: 'fonts' },
           
        //   ])
    ]

};