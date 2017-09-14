import templateUrl from './template/template.html'


angular.module('demo')
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('home.tab1', {
            url: "/1",
            templateUrl: templateUrl,
            controllerAs: 'vm',
            reloadOnSearch: false,
        });
    })