import webpack from 'webpack';
import config from './config';
import webpackDefaultConfig from './webpack.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

webpackDefaultConfig.output = {
    filename: 'scripts/[name].js',
    publicPath: '',
    path: config.PATH_DIST
};

// 与dev相比，禁用了source map, 所有图片均使用file-loader
webpackDefaultConfig.module.rules = webpackDefaultConfig.module.rules.concat([
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[local]--[hash:base64:5]'
                }
            }, {
                loader: 'autoprefixer-loader',
                options: {
                    browsers: config.CSS_PREFIX_LIST
                }
            }, { 
                loader: 'sass-loader',
                options: {
                    includePaths: [ config.PATH_SRC + '/assets/styles' ]
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
        use: 'file-loader?name=images/[name]_[hash:base64:5].[ext]'
    }
]);

webpackDefaultConfig.plugins = webpackDefaultConfig.plugins.concat([
    new HtmlWebpackPlugin({
        template: config.PATH_SRC + '/index.html',
        filename: config.PATH_DIST + '/index.html',
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
     * 压缩js
     */
    new webpack.optimize.UglifyJsPlugin({
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'angular']
        }
    }),

    new webpack.DefinePlugin({ 'env':'"prod"' }),
    /**
     * 将webpack中css抽出存入单独文件
     */
    new ExtractTextPlugin('styles/[name].min.css')
]);

export default webpackDefaultConfig;