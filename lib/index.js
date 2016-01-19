(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:main');
    const request = require('./common/request');
    const Apis = require('./apis');
    const Consumers = require('./consumers');
    const Plugins = require('./plugins');
    const checkCallback = require('./common/utils').checkCallback;

    function SDK (options) {
        let self = this;
        let opts = options || {};
        debug('options for SDK %s', JSON.stringify(opts));


        const _request = request(opts.request);

        self._request = function sdkRequest (options, callback) {
            debug('options for request %s', JSON.stringify(options));
            checkCallback(callback);

            return _request(options, callback);
        };

        self.apis = new Apis(self, opts.apis);

        self.consumers = new Consumers(self, opts.consumers);

        self.plugins = new Plugins(self, opts.consumers);

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

