/* eslint-disable no-undef */
const { ObjectID } = require('mongodb');
const express = require('express');
const request = require('supertest');
const router = require('../router');

const app = express();

const mockSurvey = [
  {
    _id: ObjectID('508f1f99bcf86cd799439014'),
    title: 'Graduates Onboarding',
    description:
      'A survey description that is about 1 sentence long yeah blah blah',
    status: 'draft',

    disclaimer: 'some disclaimer',

    dateCreated: 1573826615,
    dateEdited: 1572617513,
    dateToPublish: 1574345041,
    datePublished: '',
    dateToClose: 1576937061,
    dateClosed: '',
    anonymous: false,
    recipients: [
      {
        employeeId: ObjectID('507f1f77bcf86cd799439014'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439012'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439013'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439015'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439016'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439017'),
        completed: false,
      },
    ],
    questions: [
      ObjectID('707f1f87bcf86dd799439011'),
      ObjectID('707f1f87bcf86dd799439021'),
      ObjectID('707f1f87bcf86dd799439121'),
    ],
    responses: [],
  },
];

// const mockQuestions = [
//   {
//     _id: ObjectID('707f1f87bcf86dd799439011'),
//     title: 'Please describe your first week in few sentences',
//     type: 'text',
//     required: true,
//     commentEnabled: true,
//   },
//   {
//     _id: ObjectID('707f1f87bcf86dd799439021'),
//     title: 'How did you feel at work this week?',
//     type: 'multichoice',
//     required: true,
//     commentEnabled: true,
//     options: ['really bad', 'bad', 'meh', 'good', 'great'],
//   },
//   {
//     _id: ObjectID('707f1f87bcf86dd799439121'),
//     title: "I see myself still working at B*amery in two years' time",
//     type: 'multichoice',
//     required: true,
//     commentEnabled: true,
//     options: [
//       'strongly disagree',
//       'disagree',
//       'neutral',
//       'agree',
//       'strongly agree',
//     ],
//   },
// ];

describe('test GET API call', () => {
  app.use(router);

  it('test api call returns dummy job ', () => {
    request(app)
      .get('/survey')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).toEqual(mockSurvey);

          expect(res.body).toEqual(mockSurvey);

          done();
        }
      });
  });
});
