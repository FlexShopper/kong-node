(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:common:utils');
    const faker = require('faker');

    exports.checkCallback = function checkCallback (cb) {
        debug('checkCallback is called');

        if (typeof cb !== 'function') {
            throw new Error('Callback must be a function');
        }
    };

    exports.validApiInfo = {
        name: faker.internet.domainWord(),
        request_host: faker.internet.domainName(),
        request_path: '/' + faker.internet.domainWord(),
        strip_request_path: faker.random.boolean(),
        preserve_host: faker.random.boolean(),
        upstream_url: faker.internet.url()
    };
})();

