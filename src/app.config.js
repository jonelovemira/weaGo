/**
 * 子模块加载
 */
let dependencies = [];
const modules = require.context('./scripts/', true, /module.config.js$/);
modules.keys().forEach(key => {
    dependencies.push(modules(key).default);
});

/**
 * 页面加载
 */
let account = require.context('./scripts/pages/', true, /\.index.js$/);
account.keys().forEach(account);

/**
 * 应用初始化
 */
const app = angular.module('app', ['pasp.ui', ...dependencies]);



app.run(() => {
    "ngInject";

});

window.$ = angular.element;

export default app;


