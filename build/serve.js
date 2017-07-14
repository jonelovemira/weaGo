import gulp from 'gulp';
import config from './config';
import webpack from 'webpack';
import server from 'browser-sync';
import url from 'url';
import proxyDevMiddleware   from 'proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


gulp.task('serve', () => {
    let compiler, proxyOptions;
const webpackDevConfig = require('./webpack.dev.config').default;

    // 在入口中启动热更新模块
    webpackDevConfig.entry.app = [
        // 启用webpack HRM
        'webpack-hot-middleware/client?reload=true'
    ].concat(config.WEBPACK_ENTRY);
    console.log(webpackDevConfig);

    // 设置开发服务器的代理，请求中转至真实后台
    proxyOptions = url.parse(config.API_URL);
    proxyOptions.route = '/' + config.PROXY_PREFIX;

    // webpack编译代码
    compiler = webpack(webpackDevConfig);


    // browser-sync 同步配置
    server({
        port: process.env.PORT || config.SERVER_PORT,
        open: false,
        server: {
            baseDir: config.PATH_SRC,
            routes: {
                // 本地打包测试
                '/local-build': 'target'
            }
        },
        middleware: [
            webpackDevMiddleware(compiler, {
                stats: {
                    colors: true,
                    chunks: false,
                    modules: false
                },
                publicPath: webpackDevConfig.output.publicPath
            }),
            // 热更新中间件
            webpackHotMiddleware(compiler),
            // 代理服务中间件
            proxyDevMiddleware(proxyOptions)
        ],
        // 多设配不同步点击、滚轮和表单提交之类的操作
        ghostMode: false,
        // 屏蔽bs的联网功能
        online: false
    })
})