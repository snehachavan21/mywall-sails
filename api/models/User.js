/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
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
  }
};

