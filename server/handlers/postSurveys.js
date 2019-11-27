const { getDB } = require('../databaseConnection');
const addQuestions = require('../queries/addQuestions');
const createSurvey = require('../queries/createSurvey');
/* Survey schema:
    {
        id: ObjectID (auto generated)
        title: string
        description: string
        status: created/published/closed
        dateCreated: date
        dateToPublish: date
        datePublished: date
        dateToClose: date
        dateClosed: date
        anonymous: boolean
        recipients: [{employeeId: ObjectId completed: boolean}]
        questions: [{questionId: ObjectId position: int}]
        responses: [{
            employeeId: ObjectID (or null if anon.)
            answers: [{
                questionId: ObjectId
                answer: string/int (depends on question type)
                comment: null or string
                }]
        }]
    }
*/

const postSurveys = async (req, res) => {
  const surveyObj = req.body;
  const questions = [...surveyObj.questions];
  const db = getDB();

  try {
    const questionIds = await addQuestions(
      questions,
      db.collection('questions'),
    );
    await createSurvey(surveyObj, questionIds, db.collection('surveys'));
    res.send(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
