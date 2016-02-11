(function () {
    'use strict';

    const Joi = require('joi');

    const uuidRegex = /[a-zA-Z0-9\_\-]/;

    /* eslint-disable camelcase */
    module.exports = Joi.object().keys({
        id: Joi.string().regex(uuidRegex),
        username: Joi.string().regex(uuidRegex),
        custom_id: Joi.string().regex(uuidRegex),
        size: Joi.number().positive(),
        offset: Joi.number().min(0)
    });
    /* eslint-enable camelcase */
})();

