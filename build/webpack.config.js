import webpack from 'webpack';
import config from './config';

export default {
    entry: {
        framework: config.WEBPACK_FRAMEWORK
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                // 使用ngInject的注释时，自动加载依赖
                loader: 'ng-annotate-loader'
            },{
                // es6语法支持
                loader: 'babel-loader'
            }]
        },{
            test: /\.html$/,
            exclude: /index.html/,
            use: [{
                // 打包html代码，相对于目录参数relativeTo
                loader: 'ngtemplate-loader?relativeTo=' + config.PATH_SRC + '/'
            }, {
                // html模块加载，不对attr进行修改
                loader: 'html-loader?attrs=false'
            }]
        },{
            //加载字体文件
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: 'file-loader?name=fonts/[name].[ext]&prefix=fonts'
        }]
    },
    resolve: {
        alias: {
            // webpack配置时的一些别名
        }
    },
    devtool: "eval",
    plugins: [
        /**
         * 合并公用代码,每个模块至少三处使用，并且不在开发代码文件夹内
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return module.resource && module.resource.indexOf(config.PATH_SRC) === -1;
            }
        })
    ]
}