import Config from '../config';
import MongoJS from 'promised-mongo';

const collections = ['accounts', 'users', 'dashboards', 'widgets', 'claims', 'sites', 'roles'];
const mongoUri = Config.get('IOPS_MONGODB_URI');

const db = MongoJS(mongoUri, collections);

//db.on('error', (err) => {
//  console.log('database error', err)
//});
//
//db.on('connect', () =>  {
//  console.log(`Mongo connected to: ${mongoUri}`);
//});

export default db;

export let MongoDb = MongoJS;

export const ObjectId = MongoJS.ObjectId;
