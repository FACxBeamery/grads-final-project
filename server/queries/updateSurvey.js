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
            let newQuestion = newQuestions.insertedIds[`${counter}`].toString();
            counter++;
            return newQuestion;
          } else {
            return questionId;
          }
        });
      }

      const questionsFromSurvey = changes.questions;

      let changesToBeMade = {
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

      // change the pre-existing questions in the collection
      questionsFromSurvey.map(async (question) => {
        // if they have a _id prop, they exist already in the collection
        if (question._id) {
          let questionWithoutId = { ...question };

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
    } else {
      const result = await surveys.updateOne(
        {
          _id: ObjectID(surveyId),
        },
        {
          $set: changes,
        },
      );
    }

    return result;
  } catch (err) {
    return err;
  }
};

module.exports = updateSurvey;
