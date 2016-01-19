(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:plugins');

    function Plugins (sdk, options) {
        debug('options for plugins %s', JSON.stringify(options));

        this._sdk = sdk;

        this._request = sdk._request;
    }

    Plugins.prototype.getAll = function getPlugins (callback) {
        return this._request({
            url: 'plugins'
        }, callback);
    };

    module.exports = Plugins;
})();

