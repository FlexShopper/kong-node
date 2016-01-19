(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:common:request');
    const request = require('request');
    const Hoek = require('hoek');
    const checkCallback = require('./utils').checkCallback;
    const config = require('./defaults.config');

    /**
     * Wrapper for request module. This is the request
     * object that all requests our SDK is going to use
     *
     * @param {object} opts default options for request module wrapper
     * @return {object} wrapper for request module
     */
    function Req (opts, callback) {
        checkCallback(callback);

        debug('opts for baseRequest %s', JSON.stringify(opts));
        const options = opts || {};

        const baseRequest = request.defaults(
            Hoek.applyToDefaults(config.request.default, options)
        );

        return baseRequest;
    }

    module.exports = Req;
})();

