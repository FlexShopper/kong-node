(function () {
    'use strict';

    const SDK = require('../lib');

    const client = new SDK({});

    function handler (err, req, data) {
        if (err) {
            throw err;
        }

        console.log('PATH', req.toJSON().request.uri.path);
        console.log('DATA', data);
        console.log('\n');
    }

    client.apiStatus(handler);

    client.apis.getAll(handler);

    client.consumers.getAll(handler);

    client.plugins.getAll(handler);
})();

