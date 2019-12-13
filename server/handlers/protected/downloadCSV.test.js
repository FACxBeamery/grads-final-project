/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../../databaseConnection');
const app = require('../../app');

const authenticate = async () => {
  const loginResponse = await request(app)
    .post('/login')
    .send({
      username: 'admin',
      password: 'admin',
    });

  const {
    body: { token },
  } = loginResponse;

  return token;
};
beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

describe('Testing GET /download/:id/:anonymous', () => {
  it('Responds with status 204 when the survey has been updated successfully.', async (done) => {
    try {
      const surveyIdToDownload = '509f1f99bcf86cd799439215';

      const token = await authenticate();
      const res = await request(app)
        .get(`/download/${surveyIdToDownload}/false`)
        .set('Accept', 'application/json')
        .set('Authorization', `JWT ${token}`);
      expect(res.status).toEqual(200);

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
