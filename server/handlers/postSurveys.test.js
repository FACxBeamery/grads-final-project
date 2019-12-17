/* eslint-disable no-undef */
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { initDb, closeDb } = require('../databaseConnection');
const app = require('../app');

const dummySurvey = {
  title: 'test survey title',
  description: 'Test description',
  disclaimer: 'I AM A DUMMY DISCLAIMER BLA BLA BLA',
  status: 'draft',
  dateCreated: '12312312123',
  dateEdited: '',
  datePublished: '12312312123',
  dateClosed: '',
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
          username: 'admin',
          password: 'admin',
        });

      expect(loginResponse.status).toEqual(200);
      expect(loginResponse.body.auth).toEqual(true);
      expect(loginResponse.body.token).toBeDefined();
      const {
        body: { token },
      } = loginResponse;

      const res = await request(app)
        .post('/surveys')
        .send(dummySurvey)
        .set('Accept', 'application/json')
        .set('Authorization', `JWT ${token}`);

      expect(res.status).toEqual(200);

      return done();
    } catch (err) {
      return done(err);
    }
  });

  it('Responds with message and status 200 when no JWT provided.', async (done) => {
    try {
      const res = await request(app)
        .post('/surveys')
        .send(dummySurvey)
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
        .post('/surveys')
        .send(dummySurvey)
        .set('Authorization', `JWT `);

      expect(res.status).toEqual(401);
      expect(JSON.parse(res.text)).toStrictEqual({ message: 'No auth token' });
      return done();
    } catch (err) {
      return done(err);
    }
  });
});
