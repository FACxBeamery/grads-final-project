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

describe('Testing GET /surveys/:id', () => {
  it('Responds with JSON and status 200 when the survey has been found successfully.', (done) => {
    const documentIdToFind = '507f1f77bcf86cd799439001';
    request(app)
      .get(`/surveys/${documentIdToFind}`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.auth).toEqual(true);
        return done();
      });
  });
});