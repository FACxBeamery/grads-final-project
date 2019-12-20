/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../../databaseConnection');
const app = require('../../app');

describe('Testing GET /download/:id/:anonymous', () => {
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

  it('Responds with status 200 when the survey has been downloaded successfully.', async (done) => {
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
