/* eslint-disable no-underscore-dangle */
const { ObjectID } = require('mongodb');
const { getDb } = require('../databaseConnection');

const readSurvey = async (_id) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');

    const survey = await surveys.findOne({
      _id: ObjectID(_id),
    });

    const surveyQuestions = survey.questions;

    const questionIds = surveyQuestions.map((question) =>
      ObjectID(question.toString()),
    );

    const questionsCollection = db.collection('Questions');

    const questions = await questionsCollection
      .find({ _id: { $in: questionIds } })
      .toArray();
    // order questions in data returned by id
    survey.questions = questionIds.map((id) =>
      questions.find((element) => element._id.equals(id)),
    );
    return survey;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = readSurvey;
