const { getDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');

const readSurvey = async (_id) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');

    const survey = await surveys.findOne({
      _id: ObjectID(_id),
    });
    console.log('SURVEY', survey);

    let surveyQuestions = survey.questions;

    let questionIds = surveyQuestions.map((question) =>
      ObjectID(question.toString()),
    );

    console.log(surveyQuestions);

    const questionsCollection = db.collection('Questions');

    const questions = await questionsCollection
      .find({ _id: { $in: questionIds } })
      .toArray();

    console.log(survey.questions);

    // order questions in data returned by id
    survey.questions = questionIds.map((id) => {
      return questions.find((element) => {
        return element._id.equals(id);
      });
    });
    console.log('SURVEY TO SEND', survey);

    return survey;
  } catch (err) {
    return err;
  }
};

module.exports = readSurvey;
