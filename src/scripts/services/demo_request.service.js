class DemoRequestService {
    constructor(QueryHelper) {
        this._QueryHelper = QueryHelper;
    };

    demoLogin(params) {
        return this._QueryHelper.post('/login', params);
    }

    demoLogout(params) {
        return this._QueryHelper.post('/logout', params);
    }
};

export default DemoRequestService;