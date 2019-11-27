const createSurvey = async (
  surveyObj,
  newQuestionsArray,
  surveysCollection,
) => {
  /* takes the survey object from the front end, replaces the questions 
with the ObjectIds from the questions collection, and sends to the DB
*/

  const newSurveyObj = { ...surveyObj, questions: newQuestionsArray };
  try {
    const { acknowledged, surveyId } = await surveysCollection.insertOne(
      newSurveyObj,
    );
  } catch (e) {
    return new Error(e.message);
  }
  if (acknowledged === false) {
    return new Error('Query not acknowledged');
  } else {
    return;
  }
};
