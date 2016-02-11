(function () {
    'use strict';

    const Joi = require('joi');

    const uuidRegex = /[a-zA-Z0-9\_\-]/;

    /* eslint-disable camelcase */
    module.exports = Joi.object().keys({
        id: Joi.string().regex(uuidRegex),
        name: Joi.string().regex(uuidRegex),
        consumer_id: Joi.string().regex(uuidRegex),
        config: Joi.object().min(1),
        size: Joi.number().positive(),
        offset: Joi.number().min(0)
    });
    /* eslint-disable camelcase */
})();

