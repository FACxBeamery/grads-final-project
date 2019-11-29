const { getDb } = require('../databaseConnection');
const ObjectID = require('mongodb').ObjectID;

const readSurveyById = async (surveyIdToFind) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    let survey = await surveys.findOne({ id: ObjectID(surveyIdToFind) });
    let surveyQuestionsArray = survey.questions;
    let questionIdsArray = surveyQuestionsArray.map((obj) =>
      ObjectID(obj.questionId.toString()),
    );

    const questionsDB = db.collection('Questions');

    const questions = await questionsDB
      .find({ id: { $in: questionIdsArray } })
      .toArray();
    survey.questions = questions;

    return survey;
  } catch (err) {
    return err;
  }
};
module.exports = readSurveyById;