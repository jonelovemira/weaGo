# 前端工程开发方法

- 需要具备的知识
- 背景介绍
- 安装使用
- 开发配置
- 开发
- 生产配置

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

### 开发时配置

这部分描述主要是辅助读懂build文件夹下的各个配置文件，如果想直接进入开发，可以直接跳过此小节，直接去开发部分。

使用gulp serve之后发生了什么事情？如何实现我们所有的想法？

**1. 从抛弃ES5, 拥抱ES6开始。**

前端开发代码要使用ES6规范，于是为了保证JS风格一致，我们在写gulp任务逻辑的时候也使用babel来进行转码。在项目根目录下保存以下内容为文件.babelrc，内容如下：

```
{
  "presets": ["es2015"]
}
```

可以在这个文件中指定转码规则和插件。[具体看这里，又是阮老师的。][es6->es5]

**2. serve任务**

接下来就是写serve任务的逻辑，根据背景描述，我们需要一个工具满足以下需求：

* 本地服务器，提供自测环境
* webpack 太优秀，我们想使用各种webpack模块化打包的各种优良特性。
* 透明中转代理
* 高效开发，文件更改自动触发浏览器更新，代码修改可以热更新。

看似复杂，其实业界已经有了成熟的开源工具，而且真的只需要配置一次。即browsersync。

**3. browsersync配置**

具体可以看./build/serve.js，代码中已经做了描述。具体的配置项可以看[官网地址][browser-sync-options]。有一个配置在这里解释一下, 里面的server选项：

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

**4.webpack开发配置**

开启browsersync之后，会触发webpack使用配置对代码进行编译。围观整个编译流程，其实就是依赖分析的流程。通过入口文件E，获取E依赖的A,B,C，然后再分析A,B,C的依赖。所有的依赖均是以文件为单位的模块，加载这些模块的时候，我们可以使用不同的loader来进行处理，例如js文件，我们使用babel进行转码，scss文件，我们使用sass编译器进行转换成为css。当然配置不仅仅是如此，具体更加详细的可以查看以下两个文件。

```cmd
./build/webpack.dev.config.js
./build/webpack.config.js
```

将公共部分配置提取出来形成一个基础配置。基于这个基础配置在不同使用场景再做详细的更改。更多资料可以看[这里][webpack-usage-1], 还有[dev-tool][dev-tool]。

* 垫片babel-polyfill

有关babel还需要做一些额外的配置，即垫片babel-polyfill，需要作为依赖引入，垫片的作用，请看[这里][es6->es5], 主要是为了能够使用更多的ES6规范的API。方法如下：

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

* 全局声明替换变量

除此之外，有一个配置比较有用，即配置webpack **全局声明替换变量**。

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

于是在开发时，因为替换了env为'dev'(猜测是loader的时候替换)，所以url取值是'/local-proxy/login', 生产环境中则env是'prod'，所以url取值成为'/login'。

* 一劳永逸的引入依赖

如何在统一入口文件中引入不同的子模块是一个问题。开发一个模块就更改一次入口文件显然比较麻烦。我们可以通过webpack的require.context来帮我们解决问题。如下：

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

使用以上配置，我们可以引入不同的子模块，规则是需要在scripts下，文件名满足一个正则表达式。具体使用说明可以看[这里][webpack-require-context]，或者[中文版][webpack-require-context-chn]。

一切准备就绪，只等开发。

### 开发

在此简单介绍使用ES6风格代码写angular的app，同时介绍一些较好的开发实践。

**子模块路由**

不再是集中管理路由。由各个子模块配置路由, 在子模块的子页面(home.index.js)中，这就是高内聚，低耦合。一个例子如下：

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
```

在视图中的使用方法如下：

```html
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

**视图模板引用**

angular特性使得模板可以简单复用，当然如果要复用逻辑与模板，使用自定义指令directive会更好。使用方法如下：

```javascript
// controller.js

import commonTemplateUrl from '../common/template.html';

class ctrl {
    constructor() {
        this.template = commonTemplateUrl;
    }
}
...
```

使用时就可以把template当作一个双向绑定的变量(事实上就是绑定到了模板的相对位置).利用angular的ng-include，如下:

```html
<ng-include src="vm.template"></ng-include>
```

### 生成配置

开发自测完成之后，我们需要webpack编译出来的文件作为生产版本文件。因为自测时使用的配置webpack只是生存文件在内存中(神奇不)，所以需要专门定制新的配置将编译完成的(可以在浏览器中运行的代码)代码导出为文件。所以配置文件与开发时有所区别，具体可以关注文件./build/build.js。

运行脚本命令gulp build生成的文件存放在target文件夹，把这些文件放置在CDN或者http服务器中开放访问即完成了整个前端的工作。


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
