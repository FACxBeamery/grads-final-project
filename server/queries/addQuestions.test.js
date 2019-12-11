/* eslint-disable no-undef */
const { ObjectID } = require('mongodb');
const { initDb, closeDb } = require('../databaseConnection');
const addQuestions = require('./addQuestions');

it('Testing that adding questions to the questions collection works', async () => {
  await initDb();

  const dummyQuestions = [
    {
      _id: ObjectID('707f1f42bcf86da799439011'),
      title: 'Please describe your first week in one or two sentences',
      type: 'text',
      required: true,
      commentEnabled: true,
    },
    {
      _id: ObjectID('707f1f87bcf86da799439021'),
      title: 'How was your week?',
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
  expect(result.length).toBe(2);

  return closeDb();
});
