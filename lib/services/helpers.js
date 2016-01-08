'use strict';

import Moment from 'moment';
import ShortId from 'shortid';
import {ObjectId} from 'promised-mongo';
import Boom from 'boom';
import _ from 'lodash';

export default {

  async applyDefaults(model = {}) {
    model._id = ShortId.generate();
    model.createdAt = Moment().utc().toDate();
    model.updatedAt = Moment().utc().toDate();
    model.isActive = true;
    return model;
  }

};


