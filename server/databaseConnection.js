const assert = require('assert');
const mongoClient = require('mongodb').MongoClient;
const mongoUri = process.env.TEST
  ? 'mongodb://localhost:27017/testdb'
  : process.env.MONGO_URI || 'mongodb://localhost:27017/db';
const dummyAdmins = require('./dummyData/dummyAdmins');
const dummyEmployees = require('./dummyData/dummyEmployees');
const dummyQuestions = require('./dummyData/dummyQuestions');
const dummySurveys = require('./dummyData/dummySurveys');
const connectionConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let _db, _client;

const initDb = () => {
  return new Promise((resolve, reject) => {
    const dbConnect = (error, client) => {
      if (error) {
        reject(error);
      } else {
        console.log('Initializing database!');
        _client = client;
        _db = client.db('VibeAtBeamery');

        // _db.dropDatabase();

        refreshDb(_db);

        populateDb(_db);

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

const refreshDb = (db) => {
  db.collection('Surveys').deleteMany({});
  db.collection('Questions').deleteMany({});
  db.collection('Employees').deleteMany({});
  db.collection('Admins').deleteMany({});
};
const populateDb = (db) => {
  db.collection('Surveys').insertMany(dummySurveys);
  db.collection('Questions').insertMany(dummyQuestions);
  db.collection('Employees').insertMany(dummyEmployees);
  db.collection('Admins').insertMany(dummyAdmins);
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
