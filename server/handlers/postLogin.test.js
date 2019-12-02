// /* eslint-disable no-undef */
// const request = require('supertest');
// const { initDb, closeDb } = require('../databaseConnection');
// const app = require('../app');

describe('Test to populate file', () => {
  it('Test to pass', (done) => {
    done();
  });
});

// beforeEach(() => {
//   return initDb();
// });

// afterEach(() => {
//   return closeDb();
// });

// describe('Testing POST /login', () => {
//   it('Responds with JSON and status 200 when correct credentials are provided.', (done) => {
//     request(app)
//       .post('/login')
//       .send({
//         username: 'admin',
//         password: 'admin',
//       })
//       .set('Accept', 'application/json')
//       .expect(200)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         expect(res.body.auth).toEqual(true);
//         expect(res.body.token).toMatch(
//           /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
//         ); // Regex to match JWT.
//         expect(res.body.message).toStrictEqual(
//           'Credentials verified and user logged in.',
//         );
//         return done();
//       });
//   });

//   it('Responds with text and status 403 when incorrect credentials are provided.', (done) => {
//     request(app)
//       .post('/login')
//       .send({
//         username: 'incorrect',
//         password: 'admin',
//       })
//       .set('Accept', 'application/json')
//       .expect(403)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         expect(res.body.message).toStrictEqual(
//           'Bad credentials. Username and password do not match.',
//         );
//         return done();
//       });
//   });

//   it('Responds with text and status 403 when credentials are missing.', (done) => {
//     request(app)
//       .post('/login')
//       .send({
//         username: '',
//         password: '',
//       })
//       .set('Accept', 'application/json')
//       .expect(403)
//       .expect('Content-Type', /json/)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         expect(res.body.message).toStrictEqual(
//           'Username and/or password cannot be empty!',
//         );
//         return done();
//       });
//   });
// });
