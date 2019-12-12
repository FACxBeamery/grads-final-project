/* eslint-disable no-undef */
// const { ObjectID } = require('mongodb');
const { initDb, closeDb } = require('../databaseConnection');

const updateSurvey = require('./updateSurvey');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

it('Testing updateSurvey updates a document successfully.', async () => {
  const queryResult = await updateSurvey('508f1f99bcf86cd799439014', {
    status: 'published',
    datePublished: 1,
    dateClosed: 2,
  });

  expect(queryResult.result.nModified).toEqual(1);
  expect(queryResult.result.ok).toEqual(1);
});
