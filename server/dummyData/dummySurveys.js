/* eslint-disable max-len */
const { ObjectID } = require('mongodb');

module.exports = [
  {
    id: ObjectID('508f1f99bcf86cd799439014'),
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
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
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
  {
    id: ObjectID('508f1f99bcf86cd799439214'),
    title: 'All employees survey',
    description:
      'A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0',
    status: 'published',

    disclaimer: 'some disclaimer',

    dateCreated: 1572617513,
    dateToPublish: 1574259113,
    dateEdited: 1572617513,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: '',
    anonymous: true,
    recipients: [
      {
        completed: true,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
    ],
    questions: [
      ObjectID('707f1f87bcf86dd799439011'),
      ObjectID('707f1f87bcf86dd799439021'),
      ObjectID('707f1f87bcf86dd799439121'),
      ObjectID('707f1f87bcf76dd789439121'),
      ObjectID('707f1f87bcf76dd799439121'),
      ObjectID('707f1f87bdf76dd799439121'),
      ObjectID('707f1f87bdf76dd799539126'),
      ObjectID('707f1f87bdf76dd799439126'),
      ObjectID('707f1f87bdf76dd799439127'),
    ],
    responses: [
      {
        employeeId: null,
        answers: [
          {
            answer:
              'My first week was okay. I am just writing sentences for dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            answer: 'meh',
            comment: null,
          },
          {
            answer: 'strongly agree',
            comment: 'I am commenting on this question',
          },
          {
            answer: 'Hi another sentence to mock data!',
          },
          {
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            answer: 'Hi another sentence to mock data! Number 3',
          },
          {
            answer: 'Hi another sentence to mock data! Number 4',
          },
          {
            answer: 'yes',
          },
        ],
      },
      {
        employeeId: null,
        answers: [
          {
            answer:
              'My first week was great. I am just writing sentences for another dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            answer: 'good',
            comment: null,
          },
          {
            answer: 'neutral',
            comment: 'I am commenting on this question',
          },
          {
            answer: '2nd response Hi another sentence to mock data!',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 3',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 4',
          },
          {
            answer: 'no',
          },
        ],
      },
    ],
  },
  {
    id: ObjectID('509f1f99bcf86cd799439215'),
    title: 'People Team - engagement survey',
    description:
      'A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0',
    status: 'closed',

    disclaimer: 'some disclaimer',
    dateCreated: 1572617513,
    dateEdited: 1572617513,
    dateToPublish: 1574259113,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: 1576851113,
    anonymous: true,
    recipients: [
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
      {
        completed: false,
      },
    ],
    questions: [
      ObjectID('707f1f87bdf76dd799439127'),
      ObjectID('707f1f87bdf76dd799439126'),
      ObjectID('707f1f87bcf76dd789439121'),
      ObjectID('707f1f87bcf86dd799439021'),
    ],
    responses: [
      {
        answers: [
          {
            answer: 1,
          },
          {
            answer: 'no! im okay!',
          },
          {
            answer: 3,
          },
        ],
      },
      {
        answers: [
          {
            answer: 0,
          },
          {
            answer: 'no! im okay!',
          },
          {
            answer: 2,
          },
        ],
      },
      {
        answers: [
          {
            answer: 0,
          },
          {
            answer: 'no! im okay!',
          },
          {
            answer: 2,
          },
        ],
      },
      {
        answers: [
          {
            answer: 0,
          },
          {
            answer: 'no! im oapsodmnaposmx aks xpioa scxkay!',
          },
          {
            answer: 1,
          },
        ],
      },
      {
        answers: [
          {
            answer: 1,
          },
          {
            answer: 'no! imapiosdma sd ipkq wd !!! scxkay!',
          },
          {
            answer: 4,
          },
        ],
      },
    ],
  },
];
