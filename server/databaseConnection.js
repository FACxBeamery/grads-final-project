/* eslint-disable no-underscore-dangle */
const assert = require('assert');
const mongoClient = require('mongodb').MongoClient;
const dummyAdmins = require('./dummyData/dummyAdmins');
const dummyEmployees = require('./dummyData/dummyEmployees');
const dummyQuestions = require('./dummyData/dummyQuestions');
const dummySurveys = require('./dummyData/dummySurveys');
const mongoUri = require('./utils/mongo/getMongoUri');
const NODE_ENV = require('./utils/getNODE_ENV')();

const connectionConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let _db;
let _client;

const refreshDb = (db) => {
  return Promise.all([
    db.collection('Surveys').deleteMany({}),
    db.collection('Questions').deleteMany({}),
    db.collection('Employees').deleteMany({}),
    db.collection('Admins').deleteMany({}),
  ]);
};
const populateDb = (db) => {
  return Promise.all([
    db.collection('Surveys').insertMany(dummySurveys),
    db.collection('Questions').insertMany(dummyQuestions),
    db.collection('Employees').insertMany(dummyEmployees),
    db.collection('Admins').insertMany(dummyAdmins),
  ]);
};

const initDb = () => {
  return new Promise((resolve, reject) => {
    const dbConnect = async (error, client) => {
      if (error) {
        reject(error);
      } else {
        _client = client;
        _db = client.db();

        if (NODE_ENV !== 'production') {
          await refreshDb(_db);
          await populateDb(_db);
        }

        resolve(_db);
      }
    };

    if (_db) {
      console.warn('Trying to initialise database again!');
      resolve(_db);
    }

    mongoClient.connect(mongoUri, connectionConfig, dbConnect);
  });
};

const getDb = () => {
  assert.ok(
    _db,
    'Database has not been initialised. Please call initDb first!',
  );
  return _db;
};

const closeDb = () => {
  _db = null;

  return _client.close();
};

module.exports = { getDb, initDb, closeDb };
