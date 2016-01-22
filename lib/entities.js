(function () {
    'use strict';

    const debug = require('debug')('kong-sdk:lib:entities');
    const models = require('./common/models');

    function Entity (sdk, entity, options) {
        if (!entity || entity === '' || typeof entity !== 'string') {
            throw new Error('Need to provide a name of an entity');
        }

        debug('creating interface for %s', entity);
        debug('options for apis %s', JSON.stringify(options));

        this._sdk = sdk;

        this._request = sdk._request;

        this.entity = entity;
    }

    Entity.prototype.getAll = function getEntities (options, callback) {
        const self = this;

        if (options !== null && typeof options === 'object') {
            models[self.entity].validate(options, function (err) {
                if (err) {
                    return callback(err);
                }

                return self._request({
                    url: self.entity,
                    qs: options
                }, callback);
            });
        }

        // TEST THIS IF OPTIONS IS THE CB!!!!
        if (typeof options === 'function' && !callback) {
            return self._request({
                url: self.entity
            }, options);
        }
    };

    Entity.prototype.create = function createEntity (createInfo, callback) {
        const self = this;

        models[self.entity].validate(createInfo, function (err) {
            if (err) {
                return callback(err);
            }

            debug('createInfo validated %s', JSON.stringify(createInfo));

            return self._request({
                method: 'POST',
                url: self.entity,
                body: createInfo
            }, function (err, req, data) {
                if (err || req.statusCode !== 201) {
                    debug('error creating %s', self.entity);
                    return callback(new Error(err || JSON.stringify(data)));
                }

                debug('successfully created %s', self.entity);
                return callback(null, req, data);
            });
        });
    };

    Entity.prototype.find = function findEntity (entityNameId, callback) {
        const self = this;

        if (!entityNameId || typeof entityNameId !== 'string') {
            return callback(
                new Error('A Name or Id is *required* and it must be a string')
            );
        }

        return self._request({
            url: self.entity + '/' + entityNameId
        }, callback);

    };

    Entity.prototype.update = function updateEntity (entityNameId, updInfo, callback) {
        if (!entityNameId || typeof entityNameId !== 'string') {
            return callback(
                new Error('A Name or Id is *required* and it must be a string')
            );
        }

        const self = this;

        models[self.entity].validate(updInfo, function (err) {
            if (err) {
                return callback(err);
            }

            debug('updInfo validated %s', JSON.stringify(updInfo));

            return self._request({
                method: 'PATCH',
                url: self.entity + '/' + entityNameId,
                body: updInfo
            }, function (err, req, data) {
                debug('got response from KONG for update %s', JSON.stringify(req));
                if (err || req.statusCode !== 200 || req.statusCode === 409) {
                    debug('error creating %s', self.entity);
                    return callback(new Error(err || JSON.stringify(data)));
                }

                debug('successfully created %s', self.entity);
                return callback(null, req, data);
            });
        });
    };

    Entity.prototype.upsert = function upsertEntity (upsInfo, callback) {
        const self = this;

        models[self.entity].validate(upsInfo, function (err) {
            if (err) {
                return callback(err);
            }

            debug('upsert info validated %s', JSON.stringify(upsInfo));

            return self._request({
                method: 'PUT',
                url: self.entity,
                body: upsInfo
            }, function (err, req, data) {
                debug('got response from kong for upsert %s', JSON.stringify(req));

                if (err || req.statusCode === 409) {
                    debug('error upserting %s', self.entity);
                    return callback(new Error(err || JSON.stringify(data)));
                }

                debug('successfully upserted %s', self.entity);
                return callback(null, req, data);
            });
        });
    };

    Entity.prototype.delete = function deleteEntity (entityNameId, callback) {
        if (!entityNameId || typeof entityNameId !== 'string') {
            return callback(
                new Error('A Name or Id is *required* and it must be a string')
            );
        }

        debug('attempting to delete %s', entityNameId);

        const self = this;

        return self._request({
            method: 'DELETE',
            url: self.entity + '/' + entityNameId
        }, function (err, req, data) {
            if (err || req.statusCode !== 204) {
                debug('error deleting %s', self.entity);
                return callback(
                    new Error(err || JSON.stringify(data))
                );
            }

            debug('successfully upserted %s', self.entity);
            return callback(null, req, data);
        });
    };

    module.exports = Entity;
})();

