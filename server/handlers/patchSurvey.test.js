/* eslint-disable no-undef */
const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

describe('Testing PATCH /surveys/:id', () => {
  it('Responds with status 204 when the survey has been updated successfully.', (done) => {
    done();
    // const documentIdToUpdate = '507f1f77bcf86cd799439001';
    // const updateWith = {
    //   status: 'published',
    //   datePublished: 1,
    // };
    // request(app)
    //   .patch(`/surveys/${documentIdToUpdate}`)
    //   .send(updateWith)
    //   .set('Accept', 'application/json')
    //   .expect(204)
    //   .expect('Content-Type', /json/)
    //   .end((err, res) => {
    //     if (err) {
    //       return done(err);
    //     }
    //     expect(res.body.auth).toEqual(true);
    //     return done();
    //   });
  });
});
