/* eslint-disable no-underscore-dangle */
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
    const { anonymous } = surveyBeforeChanges;
    let employeeId;
    if (changes.employeeId) {
      employeeId = ObjectID(changes.employeeId);
    }
    if (changes.questions) {
      // initialised an array with existing ids, and having null as a placeholder for the new ones in order to keep the ordering
      let orderedQuestionIds = changes.questions.map((question) =>
        question._id ? question._id : null,
      );
      // if no _id, question is new. add to collection, get back id, add to orderedQuestionIds
      const questionsToAdd = changes.questions.filter(
        (questionToAdd) => !questionToAdd._id,
      );
      if (questionsToAdd.length > 0) {
        const newQuestions = await questions.insertMany(questionsToAdd);
        let counter = 0;
        // loop through the array and replace all the nulls with the questions that were just added to the collection
        orderedQuestionIds = orderedQuestionIds.map((questionId) => {
          if (questionId === null) {
            const newQuestion = newQuestions.insertedIds[`${counter}`].toString();
            counter += 1;
            return newQuestion;
          }
          return questionId;

        });
      }
      const questionsFromSurvey = changes.questions;
      const changesToBeMade = {
        ...changes,
        recipients: changes.recipientIds,
        questions: orderedQuestionIds,
      };
      const result = await surveys.updateOne(
        {
          _id: ObjectID(surveyId),
        },
        {
          $set: changesToBeMade,
        },
      );
      await surveys.findOne({
        _id: ObjectID(surveyId),
      });
      // if recipient has answered
      if (changes.answersFromEmployee) {
        await surveys.updateOne(
          {
            _id: ObjectID(surveyId),
            'recipients.employeeId': ObjectID(employeeId),
          },
          { $set: { 'recipients.$.completed': true } },
        );
        await surveys.updateOne(
          { _id: ObjectID(surveyId) },
          {
            $push: {
              responses: {
                employeeId: anonymous ? null : employeeId,
                answers: changes.answersFromEmployee,
              },
            },
          },
        );
      }
      // change the pre-existing questions in the collection
      questionsFromSurvey.map(async (question) => {
        // if they have a _id prop, they exist already in the collection
        if (question._id) {
          const questionWithoutId = { ...question };
          delete questionWithoutId._id;
          try {
            await questions.updateOne(
              { _id: ObjectID(question._id) },
              { $set: questionWithoutId },
            );
          } catch (error) {
            console.log(error);
          }
        }
      });
      return result
    }
    const result = await surveys.updateOne(
      {
        _id: ObjectID(surveyId),
      },
      {
        $set: changes,
      },
    );
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
};
module.exports = updateSurvey;
