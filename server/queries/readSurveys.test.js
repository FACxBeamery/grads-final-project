/* eslint-disable no-undef */
// const { ObjectID } = require('mongodb');
const { initDb, closeDb } = require('../databaseConnection');
const readSurveys = require('./readSurveys');
const dummySurveys = require('../dummyData/dummySurveys');

describe('Testing readSurveys retrieves the correct collection.', () => {
  beforeEach(() => {
    return initDb();
  });
  afterEach(() => {
    return closeDb();
  });

  it('Testing readSurveys retrieves the correct collection.', async (done) => {
    try {
      setTimeout(async () => {
        expect.assertions(1);
        const allSurveys = await readSurveys();
        expect(allSurveys).toHaveLength(dummySurveys.length);
      }, 5000);

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
