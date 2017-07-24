/**
 * 子模块加载
 */
let dependencies = [];
const modules = require.context('./scripts/', true, /module.config.js$/);
modules.keys().forEach(key => {
    dependencies.push(modules(key).default);
});

/**
 * 应用初始化
 */
const app = angular.module('app', [...dependencies]);



app.run(() => {
    "ngInject";

});

window.$ = angular.element;

export default app;


