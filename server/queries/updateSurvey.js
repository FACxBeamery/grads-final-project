const { ObjectID } = require('mongodb');
const { getDb } = require('../databaseConnection');
const updateSurvey = async (surveyId, changes) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const questions = db.collection('Questions');

    // checking if survey is anon
    let surveyToCheckIfAnon = await surveys
      .findOne({
        _id: ObjectID(surveyId),
      })
      .toArray();

    const anonymous = surveyToCheckIfAnon.anonymous;
    const employeeId = anonymous ? null : ObjectID(changes.employeeId),

    const survey = await surveys.findOne({
      _id: ObjectID(surveyId),
    });

    const result = await surveys.updateOne(
      {
        _id: ObjectID(surveyId),
      },
      {
        $set: changes,
      },
    );
    if (!anonymous)
      await surveys.updateOne(
        {
          _id: ObjectID(surveyId),
          'recipients.employeeId': ObjectID(employeeId),
        },
        { $set: { 'recipients.$.completed': true } },
      );
    
    if (changes.answersFromEmployee) {
      await surveys.updateOne(
        { _id: ObjectID(surveyId) },
        { $push: { responses: {
          employeeId: anonymous ? null : ObjectID(employeeId),
          answers: changes.answersFromEmployee,
        }  } },
      );
    }

    let surveyQuestions = survey.questions;
    surveyQuestions.map(async (question) => {
      let questionWithoutId = { ...question };
      delete questionWithoutId._id;
      try {
        let result = await questions.updateOne(
          { _id: ObjectID(question._id) },
          { $set: questionWithoutId },
        );
      } catch (error) {}
    });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = updateSurvey;
