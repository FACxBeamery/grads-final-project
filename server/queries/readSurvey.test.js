/* eslint-disable no-undef */
const { ObjectID } = require('mongodb');
const { initDb, closeDb } = require('../databaseConnection');

const readSurvey = require('./readSurvey');

beforeEach(() => {
  return initDb();
});

afterEach(() => {
  return closeDb();
});

it('Testing readSurvey retrieves the correct document.', async (done) => {
  done();
  const documentToFind = {
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
  };
  expect.assertions(1);
  const readDocument = await readSurvey('508f1f99bcf86cd799439014');
  expect(readDocument).toStrictEqual(documentToFind);
});
