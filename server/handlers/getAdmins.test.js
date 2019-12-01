/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

let jwtToken;

beforeEach(async (done) => {
  await initDb();

  request(app)
    .post('/login')
    .send({
      username: 'admin',
      password: 'admin',
    })
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.body.auth).toEqual(true);
      expect(res.body.token).toMatch(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      ); // Regex to match JWT.
      expect(res.body.message).toStrictEqual(
        'Credentials verified and user logged in.',
      );

      jwtToken = res.body.token;
      return done();
    });
});

afterEach(() => {
  return closeDb();
});

describe('Testing GET /admins', () => {
  it('Responds with text and status 200 when the user is allowed (expected JWT) to use the protected route.', async (done) => {
    request(app)
      .get('/admins')
      .query({
        username: 'admin',
      })
      .set('Authorization', `JWT ${jwtToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.message).toStrictEqual('Protected route accessed!');
        return done();
      });
  });

  it('Responds with text and status 403 when the user does not have admin priviledges.', async (done) => {
    request(app)
      .get('/admins')
      .query({
        username: 'incorrect',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `JWT ${jwtToken}`)
      .expect(403)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          return done.fail(err);
        }
        expect(res.body.message).toStrictEqual("The JWT token isn't valid.");
        return done();
      });
  });
});
