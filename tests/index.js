(function () {
    'use strict';

    const SDK = require('../lib');

    const client = new SDK({});

    function reqHandler (err, req, data) {
        if (err) {
            throw err;
            // return console.error(err);
        }

        console.log('PATH:', req.toJSON().request.uri.path);
        console.log('statusCode:', req.statusCode);
        console.log('DATA', data);
        console.log('\n');
    }

    // client.apiStatus(reqHandler);

    // client.apiInfo(reqHandler);

    // client.apis.getAll(reqHandler);

    // client.apis.create({
    //     upstream_url: 'http://www.flexchopper.com',
    //     // request_path: '/something really stupid',
    //     request_host: 'ajorlazer.com'
    // }, reqHandler);

    // client.consumers.getAll(reqHandler);

    // client.plugins.getAll(reqHandler);

    // client.apis.find('', reqHandler);

    client.apis.find('d6bfe2bc-ef31-4bfe-a6dd-9572b0c1cde4', reqHandler);

})();

