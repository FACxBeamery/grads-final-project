const axios = require('axios');

const { ObjectId } = require('mongodb');

const saveSurvey = async () => {
  try {
    const surveyForSending = {
      //   _id: ObjectId('509f1f99bcf86cd799439215'),
      title: 'People Team - engagement survey',
      description:
        'A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0',
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
          employeeId: ObjectId('507f1f77bcf86cd799439011'),
          completed: true,
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439019'),
          completed: true,
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439023'),
          completed: true,
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439033'),
          completed: true,
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439043'),
          completed: true,
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439063'),
          completed: false,
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439073'),
          completed: false,
        },
      ],
      questions: [
        ObjectId('707f1f87bcf76dd789439121'),
        ObjectId('707f1f87bdf76dd799439126'),
        ObjectId('707f1f87bcf86dd799439021'),
      ],
      responses: [
        {
          employeeId: ObjectId('507f1f77bcf86cd799439011'),
          answers: [
            {
              questionId: ObjectId('707f1f87bcf76dd789439121'),
              answer: 'strongly disagree',
            },
            {
              questionId: ObjectId('707f1f87bdf76dd799439126'),
              answer: 'no! im okay!',
            },
            {
              questionId: ObjectId('707f1f87bcf86dd799439021'),
              answer: 'meh',
            },
          ],
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439019'),
          answers: [
            {
              questionId: ObjectId('707f1f87bcf76dd789439121'),
              answer: 'disagree',
            },
            {
              questionId: ObjectId('707f1f87bdf76dd799439126'),
              answer: 'no! im okay!',
            },
            {
              questionId: ObjectId('707f1f87bcf86dd799439021'),
              answer: 'bad',
            },
          ],
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439023'),
          answers: [
            {
              questionId: ObjectId('707f1f87bcf76dd789439121'),
              answer: 'neutral',
            },
            {
              questionId: ObjectId('707f1f87bdf76dd799439126'),
              answer: 'no! im okay!',
            },
            {
              questionId: ObjectId('707f1f87bcf86dd799439021'),
              answer: 'bad',
            },
          ],
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439033'),
          answers: [
            {
              questionId: ObjectId('707f1f87bcf76dd789439121'),
              answer: 'agree',
            },
            {
              questionId: ObjectId('707f1f87bdf76dd799439126'),
              answer: 'no! im oapsodmnaposmx aks xpioa scxkay!',
            },
            {
              questionId: ObjectId('707f1f87bcf86dd799439021'),
              answer: 'really bad',
            },
          ],
        },
        {
          employeeId: ObjectId('507f1f77bcf86cd799439043'),
          answers: [
            {
              questionId: ObjectId('707f1f87bcf76dd789439121'),
              answer: 'strongly agree',
            },
            {
              questionId: ObjectId('707f1f87bdf76dd799439126'),
              answer: 'no! imapiosdma sd ipkq wd !!! scxkay!',
            },
            {
              questionId: ObjectId('707f1f87bcf86dd799439021'),
              answer: 'good',
            },
          ],
        },
      ],
    };

    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxOWYxZjc3YmNmODZjZDc5OTQzOTE3MyIsImlhdCI6MTU3NjM1OTI2MSwiZXhwIjoxNTc2MzYyODYxfQ.100n-aYGVQy9FtwfY4i6xWqSBzVrKz-1VDqZkGYPRuQ';
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:4000/surveys',
      data: surveyForSending,
      headers: { Authorization: `JWT ${jwt}` },
    });
    // eslint-disable-next-line no-console
    console.log(result.data, 'RESULT');
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

saveSurvey();
