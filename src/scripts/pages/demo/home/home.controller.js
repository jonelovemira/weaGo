import style from './home.css';

class Controller{
    constructor(demoRequest, $scope, $state) {
        "ngInject";

        this._demoRequest = demoRequest;
        this._$state = $state;
        this._$scope = $scope;


        // 监听路由地址变化
        this._$scope.$watch(() => {
            return this._$state.current.name;
        }, () => {
            this._$scope.currentRouter = this._$state.current.name;
        });
        

        // 导航路由
        this.routers = [
            { title:'表格页面1', route: 'home.tab1' },
            { title:'表单页面2', route: 'home.tab2' },
        ];
         
        // 默认显示的Tabs
        this.defaultRouteTabs = [
            { title:'表格页面1', route: 'home.tab1' }
        ];
         
    };

    // 路由跳转
    routeGo(tab) {
        this._$state.go(tab.route);
    };

    // 添加选项卡
    addRouteTab(event) {
        var route = angular.element(event.target).attr('ui-sref');
        angular.forEach(this.defaultRouteTabs, function(tab) {
            tab.active = false;
        });
     
        var _tab = _.findWhere(this.defaultRouteTabs, {
            route: route
        });
     
        if(!_tab) {
            this.defaultRouteTabs.push({
                title: event.target.innerHTML,
                route: route,
                active: true
            });
        } else {
            _tab.active = true;
        }
    };

    // 移除选项卡
    removeRouteTab(tab) {
        var _tab = _.findWhere(this.defaultRouteTabs, {
            route: tab.route
        });
        var index = this.defaultRouteTabs.indexOf(_tab);
        this.defaultRouteTabs.splice(index, 1);

        // this._findNewTabActive(index);
    };

    _findNewTabActive(index) {
        let tmp;
        if (index < this.defaultRouteTabs.length) {
            tmp = index
            // this.defaultRouteTabs[index].active = true;
        } else {
            // this.defaultRouteTabs[this.defaultRouteTabs - 1].active = true;
            tmp = this.defaultRouteTabs.length - 1;
        }

        this.defaultRouteTabs[tmp].active = true;
        this.routeGo(this.defaultRouteTabs[tmp]);
    }

    login() {
        let params = {
            username: 'name',
            password: 'password'
        };

        this._demoRequest.demoLogin(params).then((data) => {
            console.log(data);
        }).catch(() => {
            //TODO
        }).finally(() => {
            //TODO
        })
    }

    logout() {

        let params = {
            username: 'name'
        };

        this._demoRequest.demoLogout(params).then((data) => {
            console.log(data);
        }).catch(() => {
            //TODO
        }).finally(() => {
            //TODO
        })
    }
}

export default Controller;