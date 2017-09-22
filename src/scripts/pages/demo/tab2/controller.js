class controller{
    constructor($state) {
        "ngInject";
        this._$state = $state;
    }

    go() {
        this._$state.go("home.tab1");
    }
};

export default controller;