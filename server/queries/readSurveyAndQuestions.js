const { ObjectID } = require('mongodb');
const { getDb } = require('../databaseConnection');

const readSurveyById = async (surveyIdToFind) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const survey = await surveys.findOne({ id: ObjectID(surveyIdToFind) });
    const surveyQuestionsArray = survey.questions;
    const questionIdsArray = surveyQuestionsArray.map((obj) =>
      ObjectID(obj.questionId.toString()),
    );

    const questionsDB = db.collection('Questions');

    const questions = await questionsDB
      .find({ id: { $in: questionIdsArray } })
      .toArray();
    survey.questions = questions;
    // TODO when this endpoint has been protected, only survey questions and survey id, description,title and disclaimer should be passed to the front end
    return survey;
  } catch (err) {
    return err;
  }
};
module.exports = readSurveyById;
