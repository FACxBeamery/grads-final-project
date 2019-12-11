const NODE_ENV = require('../getNODE_ENV')();
const MONGO_URI = require('../getMONGO_URI')();

const mongoUri = (() => {
  if (NODE_ENV === 'development') {
    return 'mongodb://db:27017/devdb'
  }
  if (NODE_ENV === 'test') {
    return 'mongodb://db:27017/testdb'
  }
  if (NODE_ENV === 'production') {
    return MONGO_URI
  }
  throw new Error('Node environment incorrectly specified. Please ensure it is either "development", "test", or "production"')
})();

module.exports = mongoUri;
