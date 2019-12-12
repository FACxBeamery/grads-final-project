/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

describe('Testing PATCH /surveys/:id', () => {
  it('Responds with status 204 when the survey has been updated successfully.', (done) => {
    const documentIdToUpdate = '508f1f99bcf86cd799439014';
    const updateWith = {
      status: 'active',
      datePublished: 1,
    };
    request(app)
      .patch(`/surveys/${documentIdToUpdate}`)
      .send(updateWith)
      .set('Accept', 'application/json')
      .expect(204)
      .end((err) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
