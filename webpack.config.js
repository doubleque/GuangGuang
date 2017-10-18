var webpack = require('webpack')

var ExtractTextPlugin = require("extract-text-webpack-plugin")

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {       
    entry : {
        "scripts/app" : './src/scripts/app.js',
        "scripts/search" : './src/scripts/search.js'
    },
    output : {
        filename: '[name]@[chunkhash:6].js',
        path :__dirname + '/dev',      //必须是绝对路径
    },
    devtool : 'source-map',
    //配置webserver
    devServer : {
        host: 'localhost',
        port : 9000,
        contentBase: __dirname + '/dev',
        noInfo : true
    },
    module : {
        rules : [
            //解析es6+
            {
                test: /\.js$/,
                exclude : /node_modules/,
                use : [
                    {
                        loader : 'babel-loader',//解析es6
                    }
                ]
            },
            //加载css
            {
                // test : /\.scss$/,
                // use : [
                //     { loader : 'style-loader'},
                //     { loader : 'css-loader' }, //执行的时候从下往上执行
                //     { loader : 'sass-loader'}
                // ]
                test : /\.scss$/,
                use : 
                    //css抽离
                    ExtractTextPlugin.extract({
                        fallback :'style-loader',
                        use : ['css-loader','sass-loader']
                    })
                
            },
            // 加载css
            {
                test: /\.css$/,
                use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
                ]
            },

            // 加载图片
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                limit: 1000,
                name: 'media/images/[name].[hash:7].[ext]'
                }
            },

            // 加载媒体文件
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                limit: 10000,
                name: 'media/mp4/[name].[hash:7].[ext]'
                }
            },

            // 加载iconfont
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                limit: 10000,
                name: 'media/iconfont/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins : [
        //new 插件的实例
        new HtmlWebpackPlugin({
            template : './src/index.html',
            filename : 'index.html',
            chunks : ['scripts/app']
        }),
        new HtmlWebpackPlugin({
            template : './src/search.html',
            filename : 'search.html',
            chunks : ['scripts/search']
        }),
        new ExtractTextPlugin({
            filename : (getPath)=>{
                return getPath('[name]@[chunkhash:6].css').replace('scripts','style')
            },
            allChunks : true
        }),
        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
}