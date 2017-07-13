import webpack from 'webpack';
import config from './config';
import webpackDefaultConfig from './webpack.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

webpackDefaultConfig.devtool = 'eval';

webpackDefaultConfig.output = {
    filename: 'scripts/[name].js',
    publicPath: '/',
    path: config.PATH_SRC
};

webpackDefaultConfig.module.rules = webpackDefaultConfig.module.rules.concat([
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]--[hash:base64:5]',
                    sourceMap: true
                }
            }, {
                // 兼容不同浏览器的hack
                loader: 'autoprefixer-loader',
                options: {
                    browsers: config.CSS_PREFIX_LIST
                }
            }, { 
                loader: 'sass-loader',
                options: {
                    includePaths: [ config.PATH_SRC + '/assets/styles' ],
                    sourceMap: true
                }
            }],
            publicPath: '../'
        })
    }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
                loader: 'css-loader'
            }, {
                loader: 'autoprefixer-loader',
                options: {
                    browsers: config.CSS_PREFIX_LIST
                }
            }],
            publicPath: '../'
        })
    }, {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'url-loader?name=images/[name]_[hash:base64:5].[ext]'
    }
]);


webpackDefaultConfig.plugins = webpackDefaultConfig.plugins.concat([
    /**
     * 将webpack打包后的js插入html中
     */
    new HtmlWebpackPlugin({
        template: config.PATH_SRC + '/index.html',
        filename: config.PATH_SRC + '/index.html',
        inject: 'body',
        hash: true,
        chunks: ['vendor', 'framework', 'app'],
        chunksSortMode:  (a, b) => {
            if (config.WEBPACK_ENTRY_ORDER[a.names[0]] > config.WEBPACK_ENTRY_ORDER[b.names[0]]) {
                return 1;
            } else {
                return -1;
            }
        }
    }),

    /**
     * 增加webpack HMR支持
     * 监听到文件改动后自动刷新浏览器
     */
    new webpack.HotModuleReplacementPlugin(),
    

    /**
     * 将webpack中css抽出存入单独文件
     */
    new ExtractTextPlugin('styles/[name].min.css'),

    /**
     * 定义全局变量
     */
    new webpack.DefinePlugin({ 'env':'"dev"' }),
]);

export default webpackDefaultConfig;