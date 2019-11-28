const { getDb } = require('../databaseConnection');

const createSurvey = async (surveyObj, newQuestionsArray) => {
  /* takes the survey object from the front end, replaces the questions
        with the ObjectIds from the questions collection, and sends to the DB
        */

  const db = getDb();
  const surveysCollection = db.collection('Surveys');
  const newSurveyObj = { ...surveyObj, questions: newQuestionsArray };
  try {
    const { acknowledged, surveyId } = await surveysCollection.insertOne(
      newSurveyObj,
    );

    if (acknowledged === false) {
      return new Error('Query not acknowledged');
    } else {
      // all working
      return 'success';
    }
  } catch (e) {
    return new Error(e.message);
  }
};

module.exports = createSurvey;
