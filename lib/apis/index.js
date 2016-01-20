(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:apis');
    const apiModel = require('../common/models/apis');

    function Apis (sdk, options) {
        debug('options for apis %s', JSON.stringify(options));

        this._sdk = sdk;

        this._request = sdk._request;
    }

    Apis.prototype.getAll = function getApis (callback) {
        const self = this;

        return self._request({
            url: 'apis'
        }, callback);
    };

    Apis.prototype.create = function createApi (apiInfo, callback) {
        const self = this;

        apiModel.validate(apiInfo, function (err) {
            if (err) {
                return callback(err);
            }

            debug('apiInfo validated %s', JSON.stringify(apiInfo));

            return self._request({
                method: 'POST',
                url: 'apis',
                body: apiInfo
            }, function (err, req, data) {
                if (err || req.statusCode !== 201) {
                    debug('error creating api');
                    return callback(new Error(err || JSON.stringify(data)));
                }

                debug('successfully created api');
                return callback(null, req, data);
            });

            // return self._request({
            //     method: 'POST',
            //     url: 'apis',
            //     body: apiInfo
            // }, callback);
        });
    };

    Apis.prototype.find = function findApi (apiNameId, callback) {
        const self = this;

        if (!apiNameId || typeof apiNameId !== 'string') {
            return callback(
                new Error('A name or id of an API is required and it must a string')
            );
        }

        return self._request({
            url: 'apis/' + apiNameId
        }, callback);

    };

    module.exports = Apis;
})();

