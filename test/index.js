(() => {
    'use strict';

    const Code = require('code');
    const Lab = require('lab');
    const SDK = require('../lib');

    const lab = exports.lab = Lab.script();
    const describe = lab.describe;
    const it = lab.it;
    const expect = Code.expect;

    describe('creating a new client from SDK', () => {
        const client = new SDK();

        it('should return a valid instance of the SDK', (done) => {
            expect(client).to.exist();

            expect(client).to.be.an.instanceof(SDK);

            expect(Object.keys(client)).to.include([
                '_request',
                'apis',
                'consumers',
                'plugins',
                'apiStatus',
                'apiInfo'
            ]);

            done();
        });
    });

    describe('client#apiStatus & client#apiInfo', () => {
        const client = new SDK();

        it('should return the status of the API', (done) => {
            client.apiStatus((err, req /* , data */) => {
                expect(err).to.be.null();

                expect(req.statusCode).to.equal(200);

                done();
            });
        });

        it('should return the basic info of the API', (done) => {
            client.apiInfo((err, req /* , data */) => {
                expect(err).to.be.null();

                expect(req.statusCode).to.equal(200);

                done();
            });
        });
    });
})();

