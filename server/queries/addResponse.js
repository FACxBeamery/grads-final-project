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
    const firstQueryReturn = await surveysCollection.updateOne(
      { _id: ObjectID(surveyId) },
      { $push: { responses: responseForDb } },
    );
    const firstUpdateSuccessful = firstQueryReturn.result.ok === 1;
    // set recipient completed status to true
    await surveysCollection.updateOne(
      {
        _id: ObjectID(surveyId),
        'recipients.employeeId': ObjectID(employeeId),
      },
      { $set: { 'recipients.$.completed': true } },
    );
    const secondUpdateSuccessful = secondQueryReturn.result.ok === 1;
    console.log('Response added to DB!');
    if (!firstUpdateSuccessful || !secondUpdateSuccessful) {
      console.log('Query unsuccessful!');
      return new Error('Query unsuccessful');
    }
  } catch (e) {
    console.log('Oh no! An error!');
    return new Error(e.message);
  }
};
module.exports = addResponse;
