(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:consumers');

    function Consumers (sdk, options) {
        debug('options for consumers %s', JSON.stringify(options));

        this._sdk = sdk;

        this._request = sdk._request;
    }

    Consumers.prototype.getAll = function getConsumers (callback) {
        return this._request({
            url: 'consumers'
        }, callback);
    };

    module.exports = Consumers;
})();

