import path from 'path';

const BASE_PATH = path.join(__dirname, '../');

export default {

    /*
        后台代理目标地址
     */
    API_URL: 'http://jonedev.ctg.com:3000/',
    PROXY_PREFIX: 'local-proxy',

    /*
        前端开发环境端口
     */
    SERVER_PORT: 8180,

    /**
     * 路径地址
     */
    PATH_SRC: path.join(BASE_PATH, 'src'),
    PATH_DIST: path.join(BASE_PATH, 'target'),
    PATH_NODE_MODULES: path.join(BASE_PATH, 'node_modules'),

    /**
     * Webpack 配置
     */
    // 放外部引入库
    WEBPACK_FRAMEWORK: [],
    WEBPACK_ENTRY: [ 'babel-polyfill', path.join(BASE_PATH, 'src/app.js') ],
    WEBPACK_ENTRY_ORDER: { 'vendor': 0, framework: 1, app: 2 },

    /**
     * 浏览器兼容列表
     */
    CSS_PREFIX_LIST: ['> 1%', 'ie > 6', 'Firefox > 20']
}