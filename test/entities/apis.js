(() => {
    'use strict';

    const Code = require('code');
    const Lab = require('lab');
    const SDK = require('../../lib');

    const lab = exports.lab = Lab.script();
    const describe = lab.describe;
    const it = lab.it;
    const before = lab.before;
    const after = lab.after;
    const expect = Code.expect;

    describe('client.apis: Kong endpoint for API management', { timeout: 10000 }, () => {
        const client = new SDK();
        const dummyApi = {
            upstream_url: 'http://www.flexchoppa.com',
            request_path: '/something-really-stupid',
            request_host: 'Fajorlazer.com'
        };

        describe('client.apis#getAll', { timeout: 10000 }, () => {
            const searchOps = {
                valid: {
                    name: 'asdf' + Date.now()
                },
                invalid: {
                    id: 'asdf-asdf-asdf-asdf'
                }
            };

            it('should return all APIs', (done) => {
                client.apis.getAll((err, req /* , data */) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(200);

                    done();
                });
            });

            it('should return 200 and empty dataset of APIs when passing unknown API', (done) => {
                client.apis.getAll(searchOps.valid, (err, req, data) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(200);

                    expect(data.data).to.be.empty();

                    expect(data.total).to.equal(0);

                    done();
                });
            });

            it('should return 400 when id is an invalid uuid', (done) => {
                client.apis.getAll(searchOps.invalid, (err, req, data) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(400);

                    expect(data.id).to.equal(
                        searchOps.invalid.id + ' is an invalid uuid'
                    );

                    done();
                });
            });
        });

        describe('client.apis#create', { timeout: 10000 }, () => {
            const createOpts = {
                valid: require('../../lib/common/utils').validApiInfo,
                invalid: dummyApi
            };

            const _id = createOpts.valid.name;

            before((done) => {
                client.apis.create(createOpts.invalid, (err /* , req, data */) => {
                    if (err) {
                        throw new Error(err);
                    }

                    done();
                });
            });

            after((done) => {
                client.apis.delete(createOpts.invalid.request_host, (err, req /* , data */) => {
                    if (err && req.statusCode !== 404) {
                        throw new Error(err);

                    }

                    client.apis.delete(_id, (err, req /* , data */) => {
                        if (err && req.statusCode !== 404) {
                            throw new Error(err);
                        }

                        done();
                    });
                });
            });

            it('should throw an error when calling create without arguments', (done) => {
                expect(client.apis.create).to.throw(Error);

                done();
            });

            it('should return an error when passing empty options to create', (done) => {
                client.apis.create({}, function (err, data) {
                    expect(data).to.be.undefined();

                    expect(err).to.be.an.instanceof(Error);
                });

                done();
            });

            it('should create an API record in kong and return 201 created', (done) => {
                client.apis.create(createOpts.valid, (err, req, data) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(201);

                    expect(data).to.deep.include([
                        'created_at',
                        'id'
                    ]);

                    done();
                });
            });

            it('should return 409 conflict when trying to reuse while creating an API', (done) => {
                client.apis.create(createOpts.invalid, (err, req /* , data */) => {
                    expect(err).to.not.be.null();

                    expect(req.statusCode).to.equal(409);

                    done();
                });
            });
        });

        describe('client.apis#find', { timeout: 10000 }, () => {
            before((done) => {
                client.apis.create(dummyApi, (err /* , req, data */) => {
                    if (err) {
                        throw new Error(err);
                    }

                    done();
                });
            });

            after((done) => {
                client.apis.delete(dummyApi.request_host, (err, req /* , data */) => {
                    if (err && req.statusCode !== 404) {
                        throw new Error(err);
                    }

                    done();
                });
            });

            it('should throw an error when calling find without arguments', (done) => {
                expect(client.apis.find).to.throw(Error);

                done();
            });

            it('should return an API result', (done) => {
                client.apis.find(dummyApi.request_host, (err, req, data) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(200);

                    expect(data).to.deep.include([
                        'created_at',
                        'id'
                    ]);

                    done();
                });
            });

            it('should return 404 for an unknown API', (done) => {
                client.apis.find('asdfasdf', (err, req, data) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(404);

                    expect(data.message).to.equal('Not found');

                    done();
                });
            });
        });

        describe('client.apis#update', { timeout: 10000 }, () => {
            before((done) => {
                client.apis.create(dummyApi, (err /* , req, data */) => {
                    if (err) {
                        throw new Error(err);
                    }

                    done();
                });
            });

            after((done) => {
                client.apis.delete(dummyApi.request_host, (err, req /* , data */) => {
                    if (err && req.statusCode !== 404) {
                        throw new Error(err);
                    }

                    done();
                });
            });

            const uptData = {
                strip_request_path: true
            };


            it('should throw an error when called without arguments', (done) => {
                expect(client.apis.update).to.throw(Error);

                done();
            });

            it('should update api and return updated version', (done) => {
                client.apis.update(dummyApi.request_host, uptData, (err, req, data) => {
                    expect(err).to.be.null();

                    expect(data.strip_request_path).to.equal(uptData.strip_request_path);

                    expect(data).to.deep.include([
                        'created_at',
                        'id'
                    ]);

                    done();
                });
            });

            it('should return error and 404 for unknown API', (done) => {
                client.apis.update('asdf' + Date.now(), uptData, (err, req /* , data */) => {
                    expect(err).to.not.be.null();

                    expect(req.statusCode).to.equal(404);

                    expect(req.body.message).to.equal('Not found');

                    done();
                });
            });
        });

        describe('client.apis#upsert', { timeout: 10000 }, () => {
            before((done) => {
                client.apis.create(dummyApi, (err /* , req, data */) => {
                    if (err) {
                        throw new Error(err);
                    }

                    done();
                });
            });

            after((done) => {
                client.apis.delete(dummyApi.request_host, (err, req /* , data */) => {
                    if (err && req.statusCode !== 404) {
                        throw new Error(err);
                    }

                    done();
                });
            });

            const upsData = dummyApi;

            upsData.strip_request_path = true;
            upsData.upstream_url = 'http://fififi.com';

            it('should throw an error when called without arguments', (done) => {
                expect(client.apis.upsert).to.throw(Error);

                done();
            });

            it('should return an updated record of an API', (done) => {
                client.apis.find(dummyApi.request_host, (err, req, data) => {
                    upsData.id = data.id;

                    client.apis.upsert(upsData, (err, req, data) => {
                        expect(err).to.be.null();

                        expect(data.strip_request_path).to.equal(upsData.strip_request_path);

                        expect(data.upstream_url).to.equal(upsData.upstream_url);

                        done();
                    });
                });
            });

            it('should return an inserted record of an API', (done) => {
                const newApi = require('../../lib/common/utils').validApiInfo;

                client.apis.upsert(newApi, (err, req, data) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(201);

                    expect(data).to.deep.include([
                        'created_at',
                        'id'
                    ]);

                    client.apis.delete(data.id, (err, req /* , data */) => {
                        expect(err).to.be.null();

                        expect(req.statusCode).to.equal(204);

                        done();
                    });
                });
            });
        });

        describe('client.apis#delete', { timeout: 10000 }, () => {
            it('should throw an error when called without arguments', (done) => {
                expect(client.apis.delete).to.throw(Error);

                done();
            });

            it('should delete an API and return statusCode 204', (done) => {
                const newApi = require('../../lib/common/utils').validApiInfo;

                client.apis.create(newApi, (err, req, data) => {
                    expect(err).to.be.null();

                    expect(req.statusCode).to.equal(201);

                    expect(data).to.deep.include([
                        'created_at',
                        'id'
                    ]);

                    client.apis.delete(data.id, (err, req /* , data */) => {
                        expect(err).to.be.null();

                        expect(req.statusCode).to.equal(204);

                        done();
                    });
                });
            });
        });
    });
})();

