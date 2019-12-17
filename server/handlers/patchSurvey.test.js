/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

describe('Testing PATCH /surveys/:id', () => {
  beforeEach(async () => initDb());
  afterEach(() => closeDb());

  it('Responds with status 204 when the survey has been updated successfully.', async (done) => {
    try {
      const loginResponse = await request(app)
        .post('/login')
        .send({
          username: 'admin',
          password: 'admin',
        });

      expect(loginResponse.status).toEqual(200);
      expect(loginResponse.body.auth).toEqual(true);
      expect(loginResponse.body.token).toBeDefined();

      const {
        body: { token },
      } = loginResponse;

      const documentIdToUpdate = '508f1f99bcf86cd799439014';
      const updateWith = {
        status: 'active',
        datePublished: 1,
      };
      const res = await request(app)
        .patch(`/surveys/${documentIdToUpdate}`)
        .send(updateWith)
        .set('Accept', 'application/json')
        .set('Authorization', `JWT ${token}`);

      expect(res.status).toBe(204);

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
