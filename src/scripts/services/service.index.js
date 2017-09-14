import query_helper from './query_helper.service';
import demo_request from './demo_request.service';

angular.module('app')
    .service('QueryHelper', query_helper)
    .service('demoRequest', demo_request);