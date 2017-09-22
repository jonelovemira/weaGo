import templateUrl from './template/home.html';
import controller from './home.controller';

angular.module('demo')
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";
        
        // $urlRouterProvider.otherwise('/index');
        // $urlRouterProvider.when('', '/index');

        $stateProvider.state('home', {
            url: "/index",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    }).run(($rootScope) => {
        "ngInject";

        $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
            
            console.log(fromState.name,toState.name );
        })
    });
