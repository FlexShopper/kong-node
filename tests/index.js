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
    //     upstream_url: 'http://www.flexchoppa.com',
    //     request_path: '/something-really-stupid',
    //     request_host: 'Fajorlazer.com'
    // }, reqHandler);

    // client.consumers.getAll(reqHandler);

    // client.plugins.getAll(reqHandler);

    // client.apis.find('', reqHandler);

    // client.apis.find('d6bfe2bc-ef31-4bfe-a6dd-9572b0c1cde4', function (err, req, data) {
    //     console.log('GOT THIS', data);

    //     var id = data.id;

    //     delete data.id;
    //     delete data.created_at;

    //     data.request_host = 'thisismajorlazer.com';
    //     data.request_path = '/peace-is-the-mission';

    //     client.apis.update(id, data, function (err, req, data) {
    //         console.log('UDPATE', err, data);
    //         client.apis.find('d6bfe2bc-ef31-4bfe-a6dd-9572b0c1cde4', reqHandler);
    //     });
    // });

    client.apis.find('d6bfe2bc-ef31-4bfe-a6dd-9572b0c1cde4', function (err, req, data) {
        console.log('GOT THIS', data);

        // var id = data.id;

        // delete data.created_at;

        // data.request_host = 'thisismajorlazer.com';
        // data.request_path = '/peace-is-the-updated-version';

        // // UPDATE
        // client.apis.upsert(data, function (err, req, data) {
        //     console.log('UDPATE WTIH UPSERT', err, data);
        //     client.apis.find(data.id, reqHandler);
        // });

        //INSERT
        client.apis.upsert({
            upstream_url: 'http://www.flexflexflexasdf.COM',
            request_path: '/THIS-IS-AnoTHER-fucking-ATTEMPT-API-FROM-UPSERT6',
            request_host: 'FLEXSHOPPAaNOTHERFUCKINGTHING.COM6',
            name: 'FLEXCHOPPA'
        }, function (err, req, data) {
            console.log('INSERT WITH UPSERT', err, data);
            if (!err && (req.statusCode === 200 || req.statusCode === 201)) {
                console.log(req.toJSON());

                return client.apis.find(data.id, reqHandler);
            }

            console.log('it did not upserted data. Try again!');
        });
    });
})();

