const { ObjectID } = require('mongodb');
const { getDb } = require('../databaseConnection');
const updateSurvey = async (surveyId, changes) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const questions = db.collection('Questions');
    const result = await surveys.updateOne(
      {
        _id: ObjectID(surveyId),
      },
      {
        $set: changes,
      },
    );
    const survey = await surveys.findOne({
      _id: ObjectID(surveyId),
    });

    let surveyQuestions = survey.questions;
    // console.log(surveyQuestions);

    // let questionIds = surveyQuestions.map((question) => ObjectID(question._id));
    surveyQuestions.map(async (question) => {
      let questionWithoutId = { ...question };
      delete questionWithoutId._id;
      try {
        let result = await questions.updateOne(
          { _id: ObjectID(question._id) },
          { $set: questionWithoutId },
        );
        // console.log(result);
      } catch (error) {
        // console.log(error);
      }
    });
    // const result2 = await collections.updateMany(questionIds, {
    //   $set: changes,
    // });

    return result;
  } catch (err) {
    return err;
  }
};

module.exports = updateSurvey;
