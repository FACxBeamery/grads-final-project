/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

describe('Testing POST /login', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('Responds with JSON and status 200 when correct credentials are provided.', async (done) => {
    try {
      const res = await request(app)
        .post('/login')
        .send({
          username: 'admin',
          password: 'admin',
        })
        .set('Accept', 'application/json');

      expect(res.status).toBe(200);
      // expect(res['Content-Type']).toBe(/json/);
      expect(res.body.auth).toEqual(true);
      expect(res.body.token).toMatch(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      ); // Regex to match JWT.
      expect(res.body.message).toStrictEqual(
        'Credentials verified and user logged in.',
      );

      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Responds with text and status 403 when incorrect credentials are provided.', async (done) => {
    try {
      request(app)
        .post('/login')
        .send({
          username: 'incorrect',
          password: 'admin',
        })
        .set('Accept', 'application/json')
        .expect(403)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return err;
          }
          expect(res.body.message).toStrictEqual(
            'Bad credentials. Username and password do not match.',
          );
          return res;
        });
      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Responds with text and status 403 when credentials are missing.', async (done) => {
    try {
      request(app)
        .post('/login')
        .send({
          username: '',
          password: '',
        })
        .set('Accept', 'application/json')
        .expect(403)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return err;
          }
          expect(res.body.message).toStrictEqual(
            'Username and/or password cannot be empty!',
          );
          return res;
        });

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
