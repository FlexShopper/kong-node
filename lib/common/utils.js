(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:common:utils');

    exports.checkCallback = function checkCallback (cb) {
        debug('checkCallback is called');

        if (typeof cb !== 'function') {
            throw new Error('Callback must be a function');
        }
    };
})();

