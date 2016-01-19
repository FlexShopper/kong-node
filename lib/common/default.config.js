(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:common:config');

    const defaults = {
        request: {
            default: {
                baseUrl: process.env.KONG_URL || 'http://localhost:8001/',
                headers: {
                    // if enabled, makes GET reqs contain
                    // empty body when making response plus
                    // KONG API should be intelligent enough
                    // and if not, it should not better (¬_¬)
                    //'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                time: true,
                json: true
            }
        }
    };

    debug('Default config %s', JSON.stringify(defaults));

    module.exports = defaults;
})();

