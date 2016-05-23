/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            unique: true
        },
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            email: true
        },
        password: {
            type: 'string',
            required: true
        },
        online: {
            type: 'boolean'
        }
    },

    beforeCreate: function (values, cb) {
        // hash password
        bcrypt.hash(values.password, 10, function (err, hash) {
            values.password = hash;
            cb();
        });
    },

    beforeUpdate: function (values, cb) {
        if (values.password) {
            bcrypt.hash(values.password, 10, function (err, hash) {
                values.password = hash;
                cb();
            });
        } else {
            cb();
        }
    },

    verifyPassword: function (password, user) {
        return bcrypt.compareSync(password, user.password);
    },

    createPassword: function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
};

