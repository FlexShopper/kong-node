(function () {
    'use strict';

    const debug = require('debug')('king-sdk:lib:common:config');

    const defaults = {
        request: {
            default: {
                baseUrl: process.env.KONG_URL || 'http://localhost:8001/',
                headers: {
                    'Content-Type': 'application/json',
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

