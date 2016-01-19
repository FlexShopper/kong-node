(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:common:request');
    const Hoek = require('hoek');
    const config = require('./default.config');

    /**
     * Wrapper for request module. This is the request
     * object that all requests our SDK is going to use
     *
     * @param {object} opts default options for request module wrapper
     * @return {object} wrapper for request module
     */
    function Req (opts) {
        debug('opts for baseRequest %s', JSON.stringify(opts));
        const options = opts || {};

        const request = require('request');

        const baseRequest = request.defaults(
            Hoek.applyToDefaults(config.request.default, options)
        );

        return baseRequest;
    }

    module.exports = Req;
})();

