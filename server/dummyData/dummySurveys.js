/* eslint-disable max-len */
const { ObjectID } = require('mongodb');

module.exports = [
  {
    _id: ObjectID('508f1f99bcf86cd799439014'),
    title: 'Graduates Onboarding',
    description:
      'A survey to help us gauge how the graduate programme is going and to learn from your opinions',
    status: 'draft',
    disclaimer:
      'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy (www.beamery.com/privacy). If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
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
  {
    _id: ObjectID('508f1f99bcf86cd799439214'),
    title: 'Q4 All Employee Engagement Survey',
    description: 'A survey to measure engagement in Q4 of 2019',
    status: 'active',
    disclaimer:
      'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy (www.beamery.com/privacy). If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
    dateCreated: 1572617513,
    dateToPublish: 1574259113,
    dateEdited: 1572617513,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: '',
    anonymous: true,
    recipients: [
      {
        employeeId: ObjectID('507f1f77bcf86cd799439014'),
        completed: true,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439012'),
        completed: true,
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
      {
        employeeId: ObjectID('507f1f77bcf86cd799439011'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439018'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439019'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439023'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439033'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439043'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439053'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439063'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439073'),
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
            questionId: ObjectID('707f1f87bcf86dd799439011'),
            answer:
              'My first week was okay. I am just writing sentences for dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439021'),
            answer: 'meh',
            comment: null,
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439121'),
            answer: 'strongly agree',
            comment: 'I am commenting on this question',
          },
          {
            questionId: ObjectID('707f1f87bcf76dd789439121'),
            answer: 'Hi another sentence to mock data!',
          },
          {
            questionId: ObjectID('707f1f87bcf76dd799439121'),
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439121'),
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799539126'),
            answer: 'Hi another sentence to mock data! Number 3',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439126'),
            answer: 'Hi another sentence to mock data! Number 4',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439127'),
            answer: 'yes',
          },
        ],
      },
      {
        employeeId: null,
        answers: [
          {
            questionId: ObjectID('707f1f87bcf86dd799439011'),
            answer:
              'My first week was great. I am just writing sentences for another dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439021'),
            answer: 'good',
            comment: null,
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439121'),
            answer: 'neutral',
            comment: 'I am commenting on this question',
          },
          {
            questionId: ObjectID('707f1f87bcf76dd789439121'),
            answer: '2nd response Hi another sentence to mock data!',
          },
          {
            questionId: ObjectID('707f1f87bcf76dd799439121'),
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439121'),
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799539126'),
            answer: '2nd response Hi another sentence to mock data! Number 3',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439126'),
            answer: '2nd response Hi another sentence to mock data! Number 4',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439127'),
            answer: 'no',
          },
        ],
      },
    ],
  },
  {
    _id: ObjectID('509f1f99bcf86cd799439215'),
    title: 'People Team - engagement survey',
    description:
      'A survey to measure engagement in the people team during 2019',
    status: 'closed',
    disclaimer:
      'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy (www.beamery.com/privacy). If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
    dateCreated: 1572617513,
    dateEdited: 1572617513,
    dateToPublish: 1574259113,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: 1576851113,
    anonymous: false,
    recipients: [
      {
        employeeId: ObjectID('507f1f77bcf86cd799439011'),
        completed: true,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439019'),
        completed: true,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439023'),
        completed: true,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439033'),
        completed: true,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439043'),
        completed: true,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439063'),
        completed: false,
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439073'),
        completed: false,
      },
    ],
    questions: [
      ObjectID('707f1f87bcf76dd789439121'),
      ObjectID('707f1f87bdf76dd799439126'),
      ObjectID('707f1f87bcf86dd799439021'),
    ],
    responses: [
      {
        employeeId: ObjectID('507f1f77bcf86cd799439011'),
        answers: [
          {
            questionId: ObjectID('707f1f87bcf76dd789439121'),
            answer: 'strongly disagree',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439126'),
            answer: 'no! im okay!',
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439021'),
            answer: 'meh',
          },
        ],
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439019'),
        answers: [
          {
            questionId: ObjectID('707f1f87bcf76dd789439121'),
            answer: 'disagree',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439126'),
            answer: 'no! im okay!',
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439021'),
            answer: 'bad',
          },
        ],
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439023'),
        answers: [
          {
            questionId: ObjectID('707f1f87bcf76dd789439121'),
            answer: 'neutral',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439126'),
            answer: 'no! im okay!',
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439021'),
            answer: 'bad',
          },
        ],
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439033'),
        answers: [
          {
            questionId: ObjectID('707f1f87bcf76dd789439121'),
            answer: 'agree',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439126'),
            answer: 'no! im oapsodmnaposmx aks xpioa scxkay!',
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439021'),
            answer: 'really bad',
          },
        ],
      },
      {
        employeeId: ObjectID('507f1f77bcf86cd799439043'),
        answers: [
          {
            questionId: ObjectID('707f1f87bcf76dd789439121'),
            answer: 'strongly agree',
          },
          {
            questionId: ObjectID('707f1f87bdf76dd799439126'),
            answer: 'no! imapiosdma sd ipkq wd !!! scxkay!',
          },
          {
            questionId: ObjectID('707f1f87bcf86dd799439021'),
            answer: 'good',
          },
        ],
      },
    ],
  },
];
