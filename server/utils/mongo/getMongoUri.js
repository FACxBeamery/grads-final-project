const NODE_ENV = require('../getNODE_ENV')();

const mongoUri = (() => {
  if (NODE_ENV === 'development') return 'mongodb://db:27017/devdb';
  if (NODE_ENV === 'test') return 'mongodb://db:27017/testdb';
  if (NODE_ENV === 'production') return require('../getMONGO_URI')();
})();

module.exports = mongoUri;
