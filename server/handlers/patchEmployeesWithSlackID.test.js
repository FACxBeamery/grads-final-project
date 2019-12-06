const request = require('supertest');
// const { initDb, closeDb } = require('../databaseConnection');
const nock = require('nock');
const express = require('express');
const app = require('../server');
const { ObjectID } = require('mongodb');

// beforeEach(() => {
//   return initDb();
// });

// afterEach(() => {
//   return closeDb();
// });

const mockEmployees = [
  {
    id: ObjectID('507f1f77bcf86cd799439012'),
    firstName: 'Test',
    lastName: 'McTest',
    jobTitle: 'Tester',
    startDate: '09/09/2019',
    department: 'Testing',
    location: 'GB',
    manager: 'Dr Test',
    email: 'test.mctest@beamery.com',
    gender: 'Male',
    stage: 'ramping_up',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
];

describe(' test the patch employees handler', () => {
  it('test a correct formatted slackID is added and 200 response is recieved', () => {
    nock('http://localhost:4000')
      .get('/employees')
      .reply(200, mockEmployees);

    return request(app)
      .patch('/employees')
      .send('test.mctest@beamery.com', '0000000')
      .expect(200)
      .end(function(err, res) {
        expect(res.body.slackID).toEqual('0000000');
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
