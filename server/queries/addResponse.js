const { getDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');

const addResponse = async (employeeId, surveyId, anonymous, answers) => {
  console.log('Reached response query');
  const db = getDb();
  surveysCollection = db.collection('Surveys');
  const responseForDb = {
    employeeId: anonymous ? null : ObjectID(employeeId),
    answers,
  };
  try {
    const survey = await surveysCollection
      .findOne({ _id: new ObjectID(surveyId) })
      .toArray();
    const queryReturn = await surveysCollection.updateOne(
      { _id: ObjectID(surveyId) },
      { $push: { responses: responseForDb } },
    );

    console.log('Response added to DB!');
    const updateSuccessful = queryReturn.result.ok === 1;
    if (!updateSuccessful) {
      console.log('Query unsuccessful!');
      return new Error('Query unsuccessful');
    }
  } catch (e) {
    console.log('Oh no! An error!');
    return new Error(e.message);
  }
};

module.exports = addResponse;
