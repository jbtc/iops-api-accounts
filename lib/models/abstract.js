'use strict';

let _ = require('lodash');
let Moment = require('moment');

class AbstractModel {

  constructor(entity) {
    let current = Moment().utc().toDate();
    _.assign(this, entity);
    _.defaults({createdAt: current, updatedAt: current}, this);
  }

  toDto(attributes) {
    attributes = _.union(['_id'], attributes, ['createdAt', 'updatedAt']);
    var model = _.cloneDeep(this);
    if (_.isEmpty(attributes)) {
      return _.omit(model, ['_id', 'password', 'passwordHashed']);
    } else {
      return _.pick(model, attributes);
    }
  }

  toModel() {
    var model = _.cloneDeep(this);
    model._id = model.id;
    return _.omit(model, ['id']);
  }

  static toDtoCollection(collection, Model) {
    let result = [];
    for (let m of collection) {
      result.push(new Model(m).toDto());
    }
    return result;
  }
}

module.exports = AbstractModel;