/**
 * Estimate.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      unique: true
    },
    project_id: {
      type: 'integer',
      required: true
    },
    desc: {
      type: 'text',
      required: true
    },
    hours_allocated: {
      type: 'float'
    },
    hours_consumed: {
      type: 'float'
    },
    status: {
      type: 'boolean'
    },
    project: {
      model: 'project'
    }
  }
};
