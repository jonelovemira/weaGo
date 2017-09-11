# 前端工程开发方法

- 需要具备的知识
- 背景介绍
- 安装使用
- 环境配置
- 开发
- 生成生产环境代码

### 需要具备的知识

使用此项目之前，你需要掌握以下概念的一些入门级的知识，如果你还没有了解，可以通过推荐的链接进行学习。

* HTML,CSS,JS --[非常基础的W3SCHOOL][w3school]
* ES6 --[入门级][ES6]，[或者阮一峰的介绍][ES6-2]
* WEBPACK --[入门简介][webpack], [阮老师的，带了很多demo][webpack-2]
* SASS --[阮老师的介绍sass][scss]
* Angular --[入门demo][angular-demo], [使用ES6写angular][angular-using-es6]
* Gulp --[gulp][gulp-tutorial], [gulp in es6][gulp-in-es6]
* PASP --[电信内部UI库][pasp-ui], [pasp库地址][pasp-in-npm]
* bootstrap --[pasp的依赖库][bootstrap]
* BrowserSync --[自动刷新][browser-sync]

### 背景介绍

一个前端工程基本上只需要HTML,JS,CSS三种类型的文件。其中html控制dom结构，CSS控制样式，JS控制逻辑。通过分工合作提供页面展示与交互满足功能需求。

传统的开发方式比较简单，直接按需开发HTML,CSS,JS即可。这样虽然自由度高，勉强满足需求，但是容易随着业务的增加，导致可用性低，难以维护等的问题。

随着技术的迭代，我们可以使用一些流行的开源框架，让我们能够专注于自己的业务，而不是基础代码的编写。

angular就是其中的佼佼者。这个MVVM的框架提供了很多特性可以让开发人员开发出高可用的代码。它将不同的业务分割成不同的模块，controller绑定视图与数据模型；service声明可复用的逻辑过程；directive定制可复用的组件，filter编写模型数据过滤器等等。当然最强大的，是广大的开源生态库，提供满足各种需求的开源组件。

我们使用angular作为前端开发框架，开发完成形成的源码放到后端http服务器内，浏览器就可以正常下载运行了。

如果对前端的代码进行一些优化(雅虎前端优化原则)，我们可以在前端开发完成之后，使用开源库，例如任务流工具gulp, grunt， 打包工具webpack等等，有针对性的做一些优化，比如压缩代码，打包等。

所以前端可以分为开发和编译两个阶段。我们可以在开发阶段按照自己的方式组织代码，例如以文件为单位形成最小粒度的模块，交代好依赖关系。然后在编译阶段,由工具分析依赖关系，将各个不同的文件模块使用不同的编译方法(其实就是使用webpack对不同的文件使用不同的loader)，最终生成我们需要的HTML,CSS,JS等前端文件。

开发后的源码与编译出的代码的逻辑性一致，由开源库控制，通常都经过了广泛的验证，可以放心使用。例如前端的ES6规范的代码通过babel之后转换成ES5能够兼容更多的浏览器，babel在github上有22k+的star，相比可靠性可能比我们自己写的还要高。

由于分离了两个阶段，我们可以在开发阶段做更多的事情。我们可以使用一些库来辅助前端开发，帮助我们在真实部署前发现问题。可以使用前端代码在本地开设http服务器，这个服务器完全可以模拟生产环境，将前端与后端分离开来。如果后端按照接口开发好了HTTP restful的接口，那么可以通过本地服务器的代理，访问真实的后台地址。

这一切都只需要安装一些开源工具，进行一次性的配置而已。

### 安装使用

**1. 安装node**

根据运行平台下载安装，[地址在此][node-download]。

**2. 全局安装gulp**

全局安装最新版的gulp，支持ES6，使用方法[在此][gulp-in-es6]。

```cmd
npm install gulp -g
```

可以使用以下命令更换成为淘宝源。

```cmd
npm install gulp -g --registry=https://registry.npm.taobao.org
```

或者直接安装淘宝源使用工具cnpm，以后使用npm的时候都可以cnpm代替。[教程在此][taobao-npm] 。

**3. 安装开发依赖。**

安装当前项目下的库依赖，都只是开发时使用。如果安装了cnpm，可以使用cnpm代替。

```cmd
npm install
```

**4. 开启本地服务器。**

使用配置好gulp的任务，开启本地http服务器。在此步骤中使用webpack编译代码，同时附带热更新功能。

```cmd
gulp serve
```

**5. 开发-热更新**

更改本地的前端源码，保存时可以触发热更新，即无需重启服务器即可看到更改效果。build下的配置文件的更改不能触发热更新，需要重启服务器。重启操作即关闭4. 中开启服务器，重新gulp serve即可。

**6. 生成生产代码**

开发完成，自测完毕之后，运行以下代码可以在target文件夹中生成生产用的代码。具体配置项可以看环境配置中的生成配置。

```cmd
gulp build
```

**7. 发布**

拷贝target文件夹下的文件至生产http服务器根文件夹下开放访问。

### 环境配置    

**babel配置**

无论是编写gulp任务时还是前端代码的开发，我们都准备全面使用ES6语法，但是支持ES6语法的语法引擎并不多，只有较新版本的chrome和firefox内核。目前市面上的浏览器(包括后端的node)大多数只支持到ES5，所以需要配置使用babel将ES6语法转换成ES5。

1. 先保存preset，在项目根目录下保存以下内容为文件.babelrc，可以在这个文件中指定转码规则和插件。[具体看这里，又是阮老师的。][es6->es5]

```
{
  "presets": ["es2015"]
}
```

2. 使用垫片babel-polyfill，作为依赖引入。

```javascript
// ./build/config.js 引入
WEBPACK_FRAMEWORK: ['babel-polyfill', 'framework_js'],

// ./build/webpack.config.js 声明成为入口文件
entry: {
    framework: config.WEBPACK_FRAMEWORK,
    paspui: config.WEBPACK_PASPUI,
}

// ./build/webpack.dev.config.js 将入口文件作为引用插入入口html
new HtmlWebpackPlugin({
    template: config.PATH_SRC + '/index.html',
    filename: config.PATH_SRC + '/index.html',
    inject: 'body',
    hash: true,
    chunks: ['framework', 'paspui', 'app'],
    chunksSortMode:  (a, b) => {
        if (config.WEBPACK_ENTRY_ORDER[a.names[0]] > config.WEBPACK_ENTRY_ORDER[b.names[0]]) {
            return 1;
        } else {
            return -1;
        }
    }
})
```

3. 使用babel-loader加载js文件。

```javascript
// ./build/webpack.config.js
{
    test: /\.js$/,
    exclude: [/node_modules/],
    use: [{
        // 使用ngInject的注释时，自动加载依赖
        loader: 'ng-annotate-loader'
    },{
        // es6语法支持
        loader: 'babel-loader'
    }]
}
```

**gulp的两个任务配置**

gulp的两个任务组成了开发的两个阶段。在两个阶段使用webpack的两种配置。serve任务还配置了热更新、代理等功能。

1. serve。可查看./build/serve.js。
2. build。可查看./build/build.js.

**webpack开发和生产环境的配置**

将公共部分配置提取出来形成一个基础配置。基于这个基础配置在不同使用场景再做详细的更改。具体可查看./build/webpack.config.js, ./build/webpack.dev.config.js, ./build/webpack.build.config.js. 更多资料可以看[这里][webpack-usage-1], 还有[dev-tool][dev-tool]。

1. 使用sass。可以配置使用sass-loader对scss文件进行预编译成为css，具体配置方法如下, 先使用sass-loader, 然后再使用fixer-loader，最后使用css-loader。

```javascript
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
}
```

2. all in one. 本项目配置使用webpack入口将js分为了'framework', 'paspui', 'app'等三个文件，使用ExtractTextPlugin工具将css文件分离了出来。如果想所有的文件全部打包成为一个js文件，可以将entry设置成为1个，并且css的配置不使用ExtractTextPlugin，使用style-loader，一个示例如下:

```javascript
// 与dev相比，禁用了source map, 所有图片均使用file-loader
webpackDefaultConfig.module.rules = webpackDefaultConfig.module.rules.concat([
    {
        test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
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
    }, {
        test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'autoprefixer-loader',
                options: {
                    browsers: config.CSS_PREFIX_LIST
                }
            }],
    }, {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'file-loader?name=images/[name]_[hash:base64:5].[ext]'
    }
]);

webpackDefaultConfig.plugins = webpackDefaultConfig.plugins.concat([

    /**
     * 压缩js
     */
    new webpack.optimize.UglifyJsPlugin({
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'angular']
        }
    }),

    new webpack.DefinePlugin({ 'env':'"prod"' }),
]);
```

3. 配置webpack全局声明替换变量。

因为开发阶段内的本地服务器代理的情况存在，我们在请求http接口时可能会带上某个prefix来使用代理，例如本项目中的如下配置:

```javascript
// ./build/config.js
PROXY_PREFIX: 'local-proxy'

// ./build/serve.js
// 设置开发服务器的代理，请求中转至真实后台
proxyOptions = url.parse(config.API_URL);
proxyOptions.route = '/' + config.PROXY_PREFIX;
```

所以在开发阶段时可能某个接口路径为/local-proxy/login, 当我们真实部署使用时，可能不需要这个prefix。针对这种场景，我们需要使用webpack的全局声明替换变量，可以让使用者知道当前环境是开发环境还是生产环境定义时如下：

```javascript
// ./build/webpack.build.config.js
new webpack.DefinePlugin({ 'env':'"prod"' }),

// ./build/webpack.dev.config.js
new webpack.DefinePlugin({ 'env':'"dev"' }),
```

使用时可以这样:

```javascript
url = env === 'dev' ? "/local-proxy" + '/login' : '/login';
```

于是在开发时，因为替换了env为'dev'，所以url取值是'/local-proxy/login', 生产环境中则env是'prod'，所以url取值成为'/login'。

**browser-sync配置**

本项目使用browser-sync来开启本地服务器，可以在gulp的serve任务中看到针对改工具的配置。它引导浏览器自动更新，同步用户操作等。具体的配置项可以看[官网地址][browser-sync-options]。有一个配置在这里解释一下, 里面的server选项：

```javascript
server: {
    baseDir: config.PATH_SRC,
    routes: {
        // 本地打包测试
        '/local-build': 'target'
    }
}
```

这个配置主要是用来辅助从本地访问target文件夹。如果只指定baseDir，那么只能访问baseDir下的文件，不能访问baseDir兄弟目录下的文件。所以配置一个route选项，访问target目录下的index.html时可以使用http://localhost:8180/local-build/index.html来访问。

**引入开发文件**

如何在统一入口文件中引入不同的子模块是一个问题。开发一个模块就更改一次入口文件显然比较麻烦。我们可以通过webpack的配置来帮我们解决问题。主要使用webpack的require.context。如下：

```javascript
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
```

使用以上配置，我们可以引入不同的子模块，规则是需要再scripts下，并且满足一个正则表达式。具体使用说明可以看[这里][webpack-require-context]，或者[中文版][webpack-require-context-chn]。

### 开发

在此简单介绍使用ES6风格代码写angular的app，同时介绍一些较好的开发实践。

**子模块路由**

不再是集中管理路由。由各个子模块配置路由, 在子模块的子页面(home.index.js)中。一个例子如下：

```javascript
import templateUrl from './template/home.html';
import controller from './home.controller';

angular.module('demo')
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('', '/');

        $stateProvider.state('main/home', {
            url: "/",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    });
```

**controller**

将controller封装成为一个类，然后导出

```javascript
class Controller{
    constructor() {
        "ngInject";
    };
}

export default Controller;
```

这个类的成员变量都可以在页面视图html中通过vm.xxx来访问(vm为index中声明的controllerAs)。

**directive**

自定义组件同样使用类来封装，举例：

```javascript
//download_tpl_button.directive.js
import templateUrl from './template/download_tpl_button.html';
import controller from './download_tpl_button.controller';

class DownloadTplButton {

    constructor($http) {
        this.restrict = "EA";
        this.replace = true;
        this.scope = {
            btnClass: "=",
            fileName: "=",
            processType: "="
        };
        this.templateUrl = templateUrl;
        this.controller = controller;
        this.controllerAs = "vm";
    }

    static factory($http) {
        "ngInject"; 

        //可以在此处注入依赖，然后从构造器中传入, 用$http示例
        return new DownloadTplButton($http);
    }

};

export default DownloadTplButton;

// download_tpl_button.index.js
import directive from './download_tpl_button.directive';

angular.module("ctg-iot.account")
    .directive("downloadTplButton", directive.factory);

// download_tpl_button.controller.js 使用双向绑定变量

class Controller{

    constructor(BillingBatchService, $scope) {
        "ngInject";

        this._billingBatchService = BillingBatchService;
        this._$scope = $scope;

        this.downloadUrl = this._billingBatchService.getDownloadTemplateUrl(this._$scope.processType, this._$scope.fileName);
    };
};

export default Controller;

// 视图html使用双向绑定变量
```

成员属性就是传统angular写法的各种属性，包括双向绑定类型等。需要注意的是需要声明一个类方法来作为工厂，生产实例。视图HTML中使用directive双向绑定变量和controller中为：
```html
<a class="btn btn-primary margin-left-10 {{btnClass}}" ng-href="{{vm.downloadUrl}}" download="{{fileName}}.xls">
    <span><i class="fa fa-download"></i> 下载模板</span>
</a>
```

**filter**

filter声明方法可以使用简单的函数生成器完成，如下：

```javascript
//adjust.result.filter.js

export default function() {
    return (input) => {
        let map = {
            created: "未处理",
            updated: "修改争议账单",
            merged: "合并当期账单",
            delivered: "待下发调账文件",
            finished: "已完成",
            recharged: "为赠金充值",
            failed: "调账失败"
        };

        return map[input] || 'Unknown';
    }
};

//common.index.js
import adjustResultStateFilter from './filters/adjust.result.filter';
angular.module('ctg-iot.account')
    .filter('adjustResultStateFilter', adjustResultStateFilter);

// html
<td>{{result.adjustResult | adjustResultStateFilter}}<\/td>
```

**service**

service同样是封装成为类，使用方法如下：

```javascript
// global.state.saver.service.js
class Service {
    constructor() {
        this.args = undefined;
    }

    set(args) {
        this.args = args;
    }

    get() {
        return this.args;
    }
};

export default Service;

// common.index.js
import globalStateSaver from './global.state.saver.service';

angular.module('ctg-iot.account')
    .service('GlobalStateSaver', globalStateSaver)

// controller.js

class someCtrl{
    constructor('GlobalStateSaver') {
        "ngInject";
        this._GlobalStateSaver = GlobalStateSaver;
    };

    test() {
        this._GlobalStateSaver.set('test');
        console.log(this._GlobalStateSaver.get()); // 'test'
    }
}
...
```

**provider**

provider与service一样，不同的是如果需要注入$scope, $rootScope时不能在constructor中注入，需要在$get中注入，如下：

```javascript
// test.provider.js
class TestProvider {

    constructor() {}

    $get($scope) {
        "ngInject"; 

        this._$scope = $scope;
        return this;
    }
}

export default TestProvider;

// index.js
import provider from './test.provider';

export default
angular.module('test', [])
    .provider('TestProvider', provider)
    .name;
```




[w3school]: http://www.w3school.com.cn/
[ES6]: http://blog.csdn.net/lihongxun945/article/details/46867397
[ES6-2]: http://es6.ruanyifeng.com/#docs/class
[webpack]: http://html-js.com/article/3009
[scss]: http://www.ruanyifeng.com/blog/2012/06/sass.html
[webpack-2]: https://github.com/ruanyf/webpack-demos
[angular-demo]: https://github.com/angular/angular-phonecat
[angular-using-es6]: https://www.sitepoint.com/writing-angularjs-apps-using-es6/
[gulp-tutorial]: https://markpop.github.io/2014/09/17/Gulp%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B/
[gulp-in-es6]: https://github.com/wangchi/using-es6-with-gulp
[pasp-ui]: http://10.142.90.21:8001/#/
[bootstrap]: http://getbootstrap.com/
[node-download]: https://nodejs.org/zh-cn/download/
[taobao-npm]: https://npm.taobao.org/
[pasp-in-npm]: https://www.npmjs.com/package/ctg-pasp-ui
[browser-sync]: http://acgtofe.com/posts/2015/03/more-fluent-with-browsersync
[es6->es5]: http://www.ruanyifeng.com/blog/2016/01/babel.html
[webpack-usage-1]: http://blog.csdn.net/a1104258464/article/details/51914450
[dev-tool]: http://www.cnblogs.com/hhhyaaon/p/5657469.html
[browser-sync-options]: https://www.browsersync.io/docs/options
[webpack-require-context]: https://webpack.github.io/docs/context.html
[webpack-require-context-chn]: https://doc.webpack-china.org/guides/dependency-management/
