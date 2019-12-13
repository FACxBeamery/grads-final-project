/* eslint-disable no-console */
const { getDb } = require('../databaseConnection');

const createSurvey = async (surveyObj, newQuestionsArray) => {
  /* takes the survey object from the front end, replaces the questions
        with the ObjectIds from the questions collection, and sends to the DB
        */

  const db = getDb();
  const surveysCollection = db.collection('Surveys');
  const newSurveyObj = { ...surveyObj, questions: newQuestionsArray };
  try {
    const queryResult = await surveysCollection.insertOne(newSurveyObj);

    if (queryResult.result.ok !== 1) {
      return new Error('Query not acknowledged');
    }
    return 'success';
  } catch (e) {
    console.warn("There's been an error doing the survey query");
    return new Error(e.message);
  }
};

module.exports = createSurvey;
