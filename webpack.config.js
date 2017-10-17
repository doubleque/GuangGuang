module.exports = {       
    entry : {
        app : './src/scripts/app.js'
    },
    output : {
        filename: '[name].js',
        path :__dirname + '/dev/scripts',      //必须是绝对路径
    },
    //配置webserver
    devServer : {
        host: 'localhost',
        port : 4001,
        contentBase: __dirname + '/dev',
        
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
                test : /\.css$/,
                use : [
                    { loader : 'style-loader'},
                    { loader : 'css-loader' } //执行的时候从下往上执行
                    
                ]
            },
        ]
    }
}