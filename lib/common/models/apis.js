(function () {
    'use strict';

    const Joi = require('joi');

    module.exports = Joi.object().keys({
        name: Joi.string(),
        request_host: Joi.string(),
        request_path: Joi.string(),
        strip_request_path: Joi.boolean(),
        preserve_host: Joi.boolean(),
        upstream_url: Joi.string().required()
    }).xor('request_host', 'request_path');
})();

