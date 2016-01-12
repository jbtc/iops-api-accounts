'use strict';

import Config from '../config';
import MongoJS from 'promised-mongo';
import Promise from 'bluebird';

const collections = ['accounts', 'users', 'dashboards', 'widgets', 'claims', 'sites', 'roles'];
const mongoUri = Config.get('IOPS_MONGODB_URI');
const db = MongoJS(mongoUri, collections);

export default db;

export let MongoDb = MongoJS;

export const ObjectId = MongoJS.ObjectId;
