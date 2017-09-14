/**
 * API请求帮助方法
 */

class Service {
    constructor($http, $q) {
        "ngInject";
        
        this._$http = $http;
        this._$q = $q;
    }

    get(url, params) {
        return this._requst('get', ...arguments);
    }

    post(url, data, config) {
        return this._requst('post', ...arguments);
    }

    delete(url, params) {
        return this._requst('delete', ...arguments);
    }

    put(url, data, config) {
        return this._requst('put', ...arguments);
    }

    _requst(method, url, data, config) {
        const deferred = this._$q.defer();
        let request;
        url = env === 'dev' ? "/local-proxy" + url : url;
        if(method === 'get' || method === 'delete') {
            request = this._$http[method](url, { params: data });
        } else {
            request = this._$http[method](url, data, config);  
        }
        request.success(data => {
            deferred.resolve(data);
        }).error(data => {
            deferred.reject(data);
        });

        return deferred.promise;
    }


    getEvn() {
        return env === 'dev' ? "/m2m" : '';
    }
}

export default Service;