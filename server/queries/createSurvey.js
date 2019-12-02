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
    console.log('Survey added to DB!');

    if (queryResult.result.ok !== 1) {
      return new Error('Query not acknowledged');
    } else {
      return 'success';
    }
  } catch (e) {
    console.log("There's been an error doing the survey query");
    return new Error(e.message);
  }
};

module.exports = createSurvey;
