/* eslint-disable no-undef */
const request = require('supertest');
const dotenv = require('dotenv');
const { initDb, closeDb } = require('../databaseConnection');

dotenv.config();
const app = require('../app');

describe('Test authentication using JWT tokens', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('sends an error status if no auth token sent', async (done) => {
    try {
      const res = await request(app).get('/admins');
      expect(res.status).toEqual(401);

      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('sends response data if auth token sent', async (done) => {
    try {
      const loginResponse = await request(app)
        .post('/login')
        .send({
          username: process.env.VIBE_U,
          password: process.env.VIBE_P,
        });

      expect(loginResponse.status).toEqual(200);
      expect(loginResponse.body.auth).toEqual(true);
      expect(loginResponse.body.token).toBeDefined();

      const {
        body: { token },
      } = loginResponse;

      const res = await request(app)
        .get('/admins')
        .set('Authorization', `JWT ${token}`);

      expect(res.status).toEqual(200);
      expect(JSON.parse(res.text)).toStrictEqual({
        message: 'Protected route accessed!',
      });

      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Responds with message and status 401 when no JWT provided.', async (done) => {
    try {
      const res = await request(app)
        .get('/admins')
        .set('Accept', 'application/json');

      expect(res.status).toEqual(401);
      expect(JSON.parse(res.text)).toStrictEqual({ message: 'No auth token' });
      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Empty JWT token', async (done) => {
    try {
      const res = await request(app)
        .get('/admins')
        .set('Authorization', `JWT `);

      expect(res.status).toEqual(401);
      expect(JSON.parse(res.text)).toStrictEqual({ message: 'No auth token' });
      return done();
    } catch (err) {
      return done(err);
    }
  });
});
