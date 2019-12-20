/* eslint-disable no-undef */
// const { ObjectID } = require('mongodb');
const { initDb, closeDb } = require('../databaseConnection');
const { readEmployees } = require('./readEmployees');
const dummyEmployees = require('../dummyData/dummyEmployees');

describe('Testing readEmployees retrieves the correct collection.', () => {
  beforeEach(() => {
    return initDb();
  });
  afterEach(() => {
    return closeDb();
  });

  it('Testing readEmployees retrieves the correct collection.', async (done) => {
    try {
      setTimeout(async () => {
        expect.assertions(1);
        const allEmployees = await readEmployees();

        expect(allEmployees).toHaveLength(dummyEmployees.length);
      }, 5000);

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
