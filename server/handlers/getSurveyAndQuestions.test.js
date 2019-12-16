/* eslint-disable no-undef */
// const { ObjectID } = require('mongodb');
// const request = require('supertest');
const { initDb, closeDb } = require('../databaseConnection');

// const app = require('../app');

// const mockSurvey = [
//   {
//     _id: ObjectID('508f1f99bcf86cd799439014'),
//     title: 'Graduates Onboarding',
//     description:
//       'A survey description that is about 1 sentence long yeah blah blah',
//     status: 'draft',

//     disclaimer: 'some disclaimer',

//     dateCreated: 1573826615,
//     dateEdited: 1572617513,
//     dateToPublish: 1574345041,
//     datePublished: '',
//     dateToClose: 1576937061,
//     dateClosed: '',
//     anonymous: false,
//     recipients: [
//       {
//         employeeId: ObjectID('507f1f77bcf86cd799439014'),
//         completed: false,
//       },
//       {
//         employeeId: ObjectID('507f1f77bcf86cd799439012'),
//         completed: false,
//       },
//       {
//         employeeId: ObjectID('507f1f77bcf86cd799439013'),
//         completed: false,
//       },
//       {
//         employeeId: ObjectID('507f1f77bcf86cd799439015'),
//         completed: false,
//       },
//       {
//         employeeId: ObjectID('507f1f77bcf86cd799439016'),
//         completed: false,
//       },
//       {
//         employeeId: ObjectID('507f1f77bcf86cd799439017'),
//         completed: false,
//       },
//     ],
//     questions: [
//       ObjectID('707f1f87bcf86dd799439011'),
//       ObjectID('707f1f87bcf86dd799439021'),
//       ObjectID('707f1f87bcf86dd799439121'),
//     ],
//     responses: [],
//   },
// ];

describe('test GET API call', () => {
  beforeEach(() => initDb());
  afterEach(() => closeDb());

  it('test api call returns dummy job ', async (done) => {
    try {
      // const res = await request(app).get('/surveys');

      // TODO fix the mockSurvey
      // expect(res.body).toEqual(mockSurvey);
      // expect(res).toBe(200);

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
