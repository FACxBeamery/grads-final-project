const { initDb, closeDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');
const addQuestions = require('./addQuestions');

beforeAll(() => {
  return initDb();
});
afterAll(() => {
  return closeDb();
});

it('Testing that adding questions to the questions collection works', async () => {
  const dummyQuestions = [
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
  ];

  const result = await addQuestions(dummyQuestions);
  console.log(result);
  expect(result.length).toBe(2);
});
