/* eslint-disable no-undef */
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

const dummySurvey = {
  title: 'test survey title',
  description: 'Test description',
  status: 'created',
  dateCreated: '28 NOV 2019 GMT',
  dateToPublish: '28 NOV 2019 GMT',
  datePublished: '28 NOV 2019 GMT',
  dateToClose: '28 NOV 2019 GMT',
  dateClosed: '28 NOV 2019 GMT',
  anonymous: false,
  recipients: [{ employeeId: '321423143214', completed: true }],
  questions: [
    {
      id: ObjectID('707f1f42bcf86dd799439011'),
      title: 'Please describe your first week in few sentences',
      type: 'text',
      required: true,
      commentEnabled: true,
    },
    {
      id: ObjectID('707f1f87bcf86dd799439021'),
      title: 'How did you feel at work this week?',
      type: 'multichoice',
      required: true,
      commentEnabled: true,
      options: [
        {
          text: 'really bad',
          position: 0,
        },
        {
          text: 'bad',
          position: 1,
        },
        {
          text: 'meh',
          position: 2,
        },
        {
          text: 'good',
          position: 3,
        },
        {
          text: 'great',
          position: 4,
        },
      ],
    },
  ],
  responses: [
    {
      employeeId: '32123123',
      answers: [
        {
          questionId: '32142314',
          answer: 'yes!',
          comment: 'this is a comment',
        },
      ],
    },
  ],
};

describe('Testing POST to the /surveys endpoint', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('Reponds with 200 when given a suitable JSON in body.', async (done) => {
    try {
      await request(app)
        .post('/surveys')
        .send(dummySurvey)
        .set('Accept', 'application/json')
        .expect(200);
      // .expect('Content-Type', /json/);
      return done();
    } catch (err) {
      return done(err);
    }
  });

  // it('Responds with 500 if an inappropriate body is POSTed to /surveys', async (done) => {
  //   const res = await request(app)
  //     .post('/surveys')
  //     .send('An invalid body')
  //     .set('Accept', 'application/json');
  //   expect(res.status).toBe(500);
  //   return done();
  // });
});
