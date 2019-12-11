const { ObjectID } = require('mongodb');
const { getDb } = require('../databaseConnection');

const addResponse = async (employeeId, surveyId, anonymous, answers) => {
  console.log('Reached response query');
  const db = getDb();
  const surveysCollection = db.collection('Surveys');
  const responseForDb = {
    employeeId: anonymous ? null : ObjectID(employeeId),
    answers,
  };
  try {
    const firstQueryReturn = await surveysCollection.updateOne(
      { _id: ObjectID(surveyId) },
      { $push: { responses: responseForDb } },
    );
    const firstUpdateSuccessful = firstQueryReturn.result.ok === 1;
    // set recipient completed status to true
    const secondQueryReturn = await surveysCollection.updateOne(
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
    return 'success'
  } catch (err) {
    console.log('Unable to add response to database.');
    return new Error(err.message);
  }
};
module.exports = addResponse;
