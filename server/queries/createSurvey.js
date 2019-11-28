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
    }
  } catch (e) {
    return new Error(e.message);
  }
  console.log('Survey added to DB!');
};

module.exports = createSurvey;
