/* eslint-disable no-undef */
const { initDb, closeDb } = require('../databaseConnection');

const updateSurvey = require('./updateSurvey');

describe('Testing updateSurvey query', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('Testing updateSurvey updates a document successfully.', async (done) => {
    try {
      const queryResult = await updateSurvey('508f1f99bcf86cd799439014', {
        status: 'published',
        datePublished: 1,
        dateClosed: 2,
      });

      expect(queryResult.result.nModified).toEqual(1);
      expect(queryResult.result.ok).toEqual(1);
      return done();
    } catch (err) {
      return done(err);
    }
  });
});
