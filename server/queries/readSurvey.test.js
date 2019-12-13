/* eslint-disable no-undef */
const { ObjectID } = require('mongodb');
const { initDb, closeDb } = require('../databaseConnection');
const readSurvey = require('./readSurvey');

describe('Testing readSurvey retrieves the correct document.', () => {
  beforeEach(() => {
    return initDb();
  });
  afterEach(() => {
    return closeDb();
  });

  it('Testing readSurvey retrieves the correct document.', async (done) => {
    try {
      const documentToFind = {
        _id: ObjectID('508f1f99bcf86cd799439014'),
        title: 'Graduates Onboarding',
        description:
          'A survey to help us gauge how the graduate programme is going and to learn from your opinions',
        status: 'draft',
        disclaimer:
          'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy. If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
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
          {
            _id: ObjectID('707f1f87bcf86dd799439011'),
            title: 'Please describe your first week in few sentences',
            type: 'text',
            required: true,
            commentEnabled: true,
          },
          {
            _id: ObjectID('707f1f87bcf86dd799439021'),
            title: 'How did you feel at work this week?',
            type: 'multichoice',
            required: true,
            commentEnabled: true,
            options: ['really bad', 'bad', 'meh', 'good', 'great'],
          },
          {
            _id: ObjectID('707f1f87bcf86dd799439121'),
            title: "I see myself still working at B*amery in two years' time",
            type: 'multichoice',
            required: true,
            commentEnabled: true,
            options: [
              'strongly disagree',
              'disagree',
              'neutral',
              'agree',
              'strongly agree',
            ],
          },
        ],
        responses: [],
      };
      expect.assertions(1);
      const readDocument = await readSurvey('508f1f99bcf86cd799439014');
      expect(readDocument).toStrictEqual(documentToFind);

      return done();
    } catch (err) {
      return done(err);
    }
  });
});
