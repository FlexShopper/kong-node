(function () {
    'use strict';

    module.exports = {
        apis: require('./apis'),
        consumers: require('./consumers'),
        plugins: require('./plugins'),
        search: {
            apis: require('./search/apis'),
            consumers: require('./search/consumers'),
            plugins: require('./search/plugins')
        }
    };
})();

