(function () {
    'use strict';

    const Joi = require('joi');

    // jshint -W101
    // jscs:disable
    const hostRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
    // jscs:enable
    // jshint +W101
    const pathRegex = /^\/(?!.*\/\/)([a-zA-Z0-9\-\_\.\/]+)$/;
    const uuidRegex = /[a-zA-Z0-9\_\-]/;

    /* eslint-disable camelcase */
    module.exports = Joi.object().keys({
        id: Joi.string().regex(uuidRegex),
        name: Joi.string(),
        request_host: Joi.string().regex(hostRegex),
        request_path: Joi.string().regex(pathRegex),
        strip_request_path: Joi.boolean(),
        preserve_host: Joi.boolean(),
        upstream_url: Joi.string().uri().required(),
        size: Joi.number().positive(),
        offset: Joi.number().min(0)
    }).or('request_host', 'request_path');
    /* eslint-enable camelcase */
})();

