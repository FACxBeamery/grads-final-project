/* eslint-disable no-undef */
const { initDb, closeDb } = require('../databaseConnection');
const createSurvey = require('./createSurvey');

beforeEach(() => {
  return initDb();
});
afterEach(() => {
  return closeDb();
});

it('Testing that adding a new survey works', async (done) => {

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
    questions: [{ questionId: '4321211412', position: 2 }],
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

  const dummyQuestionsArray = [{ questionId: '4321211412', position: 2 }];

  const result = await createSurvey(dummySurvey, dummyQuestionsArray);
  expect(result).toEqual('success');
  done();
});
