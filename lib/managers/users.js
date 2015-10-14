'use strict';

let  AbstractManager = require('./abstract');
let _ = require('lodash');
let Bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

class UserManager extends AbstractManager {

  constructor() {
    super('users');
  }

  active() {
    return this.filterBy({ isActive: true });
  }

  byEmail(email) {
    return this.active().filter({ email: this.r.expr(email).downcase() });
  }

  existsByEmail(email) {
    return this.byEmail(email).exists();
  }

  * create(user) {
    let exists = yield this.existsByEmail(user.email);
    if (exists) {
      throw new Error(`User already exists with email: ${user.email}`);
    }
    user.password = this._hash(user.password);
    let result = yield this.insert(user).run();
    return this.byId(_.first(result.generated_keys));
  }

  update(user) {
    return this.byId(user.id).update(user);
  }

  removeById(id) {
    return this.byId(id);
  }

  _hash(password) {
    return new Promise((resolve, reject) => {
      Bcrypt.genSalt(SALT_WORK_FACTOR, (e, salt) => {
        if (e) return reject(e);
        Bcrypt.hash(password, salt, (e, result) => {
          if (e) return reject(e);
          return resolve(result);
        });
      });
    });
  }
}

module.exports = UserManager;
