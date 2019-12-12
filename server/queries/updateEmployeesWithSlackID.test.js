/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
const nock = require('nock');

const updateEmployeesWithSlackID = require('./updateEmployeesWithSlackID');
const { getDb, initDb, closeDb } = require('../databaseConnection');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

it('mock get request to slack API', async () => {
  const db = getDb();
  const mockSlackId = '000000';
  nock('https://slack.com')
    .get('/users.lookupByEmail')
    .reply(200, mockSlackId);

  const result = await updateEmployeesWithSlackID(db);
  return result;
});
