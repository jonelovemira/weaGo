import templateUrl from './template/template.html'
import controller from './controller.js'


angular.module('demo')
    .config(($stateProvider) => {
        "ngInject";

        $stateProvider.state('home.tab2', {
            url: "/2",
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            reloadOnSearch: false,
        });
    })