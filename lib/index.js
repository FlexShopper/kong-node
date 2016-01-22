(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:main');
    const request = require('./common/request');
    const checkCallback = require('./common/utils').checkCallback;
    const Entity = require('./entities');

    function SDK (options) {
        const self = this;
        const opts = options || {};
        debug('options for SDK %s', JSON.stringify(opts));

        const _request = request(opts.request);

        self._request = function sdkRequest (options, callback) {
            debug('options for request %s', JSON.stringify(options));
            checkCallback(callback);

            return _request(options, callback);
        };

        self.apis = new Entity(self, 'apis', opts.apis);

        self.consumers = new Entity(self, 'consumers', opts.consumers);

        self.plugins = new Entity(self, 'plugins', opts.consumers);

        self.apiStatus = function apiStatus (callback) {
            return _request({
                url: 'status'
            }, callback);
        };

        self.apiInfo = function apiInfo (callback) {
            return _request({
                url: '/'
            }, callback);
        };
    }

    module.exports = SDK;
})();

