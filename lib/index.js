(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:main');

    function SDK (options) {
        debug('options for SDK %s', JSON.stringify(options));
    }

    module.exports = SDK;
})();

