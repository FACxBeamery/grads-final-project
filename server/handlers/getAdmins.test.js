/* eslint-disable no-undef */
const request = require('supertest');
const axios = require('axios');
const { initDb, closeDb } = require('../databaseConnection');

let jwtToken;

beforeEach(async () => {
  await initDb();
  const response = await axios.post('http://localhost:4000/login', {
    username: 'admin',
    password: 'admin',
  });

  jwtToken = response.data.token;
  //   return initDb();
});

afterEach(() => {
  return closeDb();
});

describe('Testing GET /admins', () => {
  it('Responds with text and status 200 when the user is allowed (expected JWT) to use the protected route.', async (done) => {
    // const response = await axios.post('http://localhost:4000/login', {
    //   username: 'admin',
    //   password: 'admin',
    // });

    // const jwt = response.data.token;

    request('http://localhost:4000')
      .get('/admins')
      .query({
        username: 'admin',
      })
      .set('Authorization', `JWT ${jwtToken}`)
      .expect(200)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.text).toStrictEqual('Protected route accessed!');
        return done();
      });
  });

  it('Responds with text and status 403 when the user does not have admin priviledges.', async (done) => {
    // console.log('entered');
    // const response1 = await axios.post('http://localhost:4000/login', {
    //   username: 'incorrect',
    //   password: 'admin',
    // });
    // console.log('response1 first:', response1);
    // const jwt = response1.data.token;
    // console.log('jwt token: ', jwt);

    // console.log('jwt tokens: ', jwtToken)

    request('http://localhost:4000')
      .get('/admins')
      .query({
        username: 'incorrect',
      })
      .set('Accept', 'application/json')
      .set('Authorization', `JWT ${jwtToken}`)
      .expect(403)
      .expect('Content-Type', /text\/html/)
      .end((err, res) => {
        if (err) {
          return done.fail(err);
        }
        expect(res.text).toStrictEqual("The JWT token isn't valid.");
        return done();
      });
  });
});
