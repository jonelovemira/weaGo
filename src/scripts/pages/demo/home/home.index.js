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