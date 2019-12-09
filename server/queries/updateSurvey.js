const { ObjectID } = require('mongodb');
const { getDb } = require('../databaseConnection');
const updateSurvey = async (surveyId, changes) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const questions = db.collection('Questions');

    // checking if survey is anon
    const surveyBeforeChanges = await surveys.findOne({
      _id: ObjectID(surveyId),
    });

    const anonymous = surveyBeforeChanges.anonymous;
    const employeeId = anonymous ? null : ObjectID(changes.employeeId);

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

    // if recipient has answered, but the survey is anonymous
    if (changes.answersFromEmployee === null && anonymous) {
      await surveys.updateOne(
        {
          _id: ObjectID(surveyId),
          'recipients.employeeId': ObjectID(employeeId),
        },
        { $set: { 'recipients.$.completed': true } },
      );
      // if recipient has answered, and the survey is anonymous
    } else if (changes.answersFromEmployee === null && !anonymous) {
      await surveys.updateOne(
        { _id: ObjectID(surveyId) },
        {
          $push: {
            responses: {
              employeeId: anonymous ? null : ObjectID(employeeId),
              answers: changes.answersFromEmployee,
            },
          },
        },
      );
    }

    let surveyQuestions = survey.questions;

    surveyQuestions.map(async (question) => {
      let questionWithoutId = { ...question };
      delete questionWithoutId._id;

      try {
        await questions.updateOne(
          { _id: ObjectID(questionWithoutId) },
          { $set: questionWithoutId },
        );
      } catch (error) {
        console.log(error);
      }
    });

    return result;
  } catch (err) {
    return err;
  }
};

module.exports = updateSurvey;
