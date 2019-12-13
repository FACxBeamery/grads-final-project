/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

describe('Testing GET /surveys/:id', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('Responds with JSON and status 200 when the survey has been found successfully.', async (done) => {
    try {
      const res = await request(app)
        .get('/surveys/508f1f99bcf86cd799439014')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.status).toEqual(200);
      return done();
    } catch (err) {
      return done(err);
    }
  });
});
