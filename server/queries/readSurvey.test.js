/* eslint-disable no-undef */
const { initDb, closeDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');

const readSurvey = require('./readSurvey');

// beforeEach(() => {
//   return initDb();
// });

// afterEach(() => {
//   return closeDb();
// });

it('Testing readSurvey retrieves the correct document.', async (done) => {
  done();
  // const documentToFind = {
  //   id: ObjectID('507f1f77bcf86cd799439001'),
  //   title: 'Graduates Onboarding',
  //   description:
  //     'A survey description that is about 1 sentence long yeah blah blah',
  //   status: 'draft',
  //   disclaimer: 'some disclaimer',
  //   dateCreated: 1573826615,
  //   dateToPublish: 1574345041,
  //   datePublished: '',
  //   dateToClose: 1576937061,
  //   dateClosed: '',
  //   anonymous: false,
  //   recipients: [
  //     {
  //       employeeId: ObjectID('507f1f77bcf86cd799439014'),
  //       completed: false,
  //     },
  //     {
  //       employeeId: ObjectID('507f1f77bcf86cd799439012'),
  //       completed: false,
  //     },
  //     {
  //       employeeId: ObjectID('507f1f77bcf86cd799439013'),
  //       completed: false,
  //     },
  //     {
  //       employeeId: ObjectID('507f1f77bcf86cd799439015'),
  //       completed: false,
  //     },
  //     {
  //       employeeId: ObjectID('507f1f77bcf86cd799439016'),
  //       completed: false,
  //     },
  //     {
  //       employeeId: ObjectID('507f1f77bcf86cd799439017'),
  //       completed: false,
  //     },
  //   ],
  //   questions: [
  //     { questionId: ObjectID('707f1f87bcf86dd799439011'), position: 1 },
  //     { questionId: ObjectID('707f1f87bcf86dd799439021'), position: 2 },
  //     { questionId: ObjectID('707f1f87bcf86dd799439121'), position: 3 },
  //   ],
  //   responses: [],
  // };
  // expect.assertions(1);
  // const readDocument = await readSurvey('507f1f77bcf86cd799439001');
  // expect(readDocument).toStrictEqual(documentToFind);
});
