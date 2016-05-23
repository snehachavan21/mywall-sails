/**
 * Taggable.js
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
    tag_id: {
      type: 'integer',
      required: true
    },
    taggable_id: {
      type: 'integer',
      required: true
    },
    taggable_type: {
      type: 'string',
      required: true
    }
  }
};

