/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../../databaseConnection');
const app = require('../../app');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

describe('Testing GET /download/:id/:anonymous', () => {
  it('Responds with status 204 when the survey has been updated successfully.', (done) => {
    const surveyIdToDownload = '509f1f99bcf86cd799439215';

    request(app)
      .get(`/download/${surveyIdToDownload}/false`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
