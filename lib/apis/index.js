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

    Apis.prototype.update = function update (apiNameId, updInfo, callback) {
        if (!apiNameId || typeof apiNameId !== 'string') {
            return callback(
                new Error('A name or id of an API is required and it must a string')
            );
        }

        const self = this;

        apiModel.validate(updInfo, function (err) {
            if (err) {
                return callback(err);
            }

            debug('apiInfo validated %s', JSON.stringify(updInfo));

            return self._request({
                method: 'PATCH',
                url: 'apis/' + apiNameId,
                body: updInfo
            }, function (err, req, data) {
                if (err || req.statusCode !== 200 || req.statusCode === 409) {
                    debug('error creating api');
                    return callback(new Error(err || JSON.stringify(data)));
                }

                debug('successfully created api');
                return callback(null, req, data);
            });
        });
    };

    Apis.prototype.upsert = function upsert (upsInfo, callback) {
        let expectedStatusCode = 200;

        // Attempting an update
        if (upsInfo && upsInfo.hasOwnProperty('id')) {
            expectedStatusCode = 201;
        }

        const self = this;

        apiModel.validate(upsInfo, function (err) {
            if (err) {
                return callback(err);
            }

            debug('upsert info validated %s', JSON.stringify(upsInfo));

            return self._request({
                method: 'PUT',
                url: 'apis',
                body: upsInfo
            }, function (err, req, data) {
                console.log('\n\n\nFROM API.js\n\n\n');
                console.log('ERR', err, '\n\n\n', 'REQ', req, '\n\n\n', 'DATA', data, 'REQJSON', req.toJSON());
                if (err || req.statusCode === 409) {
                    debug('error upserting api');
                    return callback(new Error(err || JSON.stringify(data)));
                }

                debug('successfully upserted api');
                return callback(null, req, data);
            });
        });
    };

    module.exports = Apis;
})();

