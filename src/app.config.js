/**
 * 子模块加载
 */
let dependencies = [];
const modules = require.context('./scripts/', true, /module.config.js$/);
modules.keys().forEach(key => {
    dependencies.push(modules(key).default);
});

const app = angular.module('app', ['pasp.ui', ...dependencies]);


/**
 * 页面加载
 */
let pages = require.context('./scripts/pages/', true, /\.index.js$/);
pages.keys().forEach(pages);

/**
 * 公共服务加载
 */
let services = require.context('./scripts/services/', true, /\.index.js$/);
services.keys().forEach(services);

/**
 * 应用初始化
 */



app.run(() => {
    "ngInject";

});

window.$ = angular.element;

export default app;


