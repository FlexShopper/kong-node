(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:apis');

    function Apis (sdk, options) {
        debug('options for apis %s', JSON.stringify(options));

        this._sdk = sdk;

        this._request = sdk._request;
    }

    Apis.prototype.getAll = function getApis (callback) {
        return this._request({
            url: 'apis'
        }, callback);
    };

    module.exports = Apis;
})();

