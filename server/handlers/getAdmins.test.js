/* eslint-disable no-undef */
const request = require('supertest');
const axios = require('axios');
const { initDb, closeDb } = require('../databaseConnection');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

// describe('Testing GET /admins', () => {
//   it('Responds with text and status 200 when the user is allowed (expected JWT) to use the protected route.', async (done) => {
//     const response = await axios.post('http://localhost:4000/login', {
//       username,
//       password,
//     });

//     const jwt = response.data.token;

//     request('http://localhost:4000')
//       .get('/admins')
//       .send({
//         params: {
//           username: 'admin',
//         },
//         headers: { Authorization: `JWT ${jwt}` },
//       })
//       .set('Accept', 'application/json')
//       .expect(200)
//       .expect('Content-Type', /text\/html/)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         expect(res.body.message).toStrictEqual('Protected route accessed!');
//         return done();
//       });
//   });
// });
