/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const nock = require('nock');

const updateEmployeesWithSlackID = require('./updateEmployeesWithSlackID');
const { getDb, initDb, closeDb } = require('../databaseConnection');

describe('mock get request to slack API', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('mock get request to slack API', async (done) => {
    try {
      const db = getDb();
      const mockSlackId = '000000';
      nock('https://slack.com')
        .get('/users.lookupByEmail')
        .reply(200, mockSlackId);

      await updateEmployeesWithSlackID(db);

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
