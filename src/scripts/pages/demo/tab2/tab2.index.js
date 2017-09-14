import templateUrl from './template/template.html'


angular.module('demo')
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('home.tab2', {
            url: "/2",
            templateUrl: templateUrl,
            controllerAs: 'vm',
            reloadOnSearch: false,
        });
    })