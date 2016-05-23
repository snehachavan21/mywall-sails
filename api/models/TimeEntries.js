/**
 * TimeEntries.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    desc: {
      type: 'string',
      required: true
    },
    user_id: {
      type: 'integer',
      required: true
    },
    project_id: {
      type: 'integer',
      required: true
    },
    project_name: {
      type: 'string',
      required: true
    },
    client_name: {
      type: 'string',
      required: true
    },
    time: {
      type: 'string',
      required: true
    }
  }

};

