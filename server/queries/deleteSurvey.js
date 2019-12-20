/* eslint-disable no-console */
const { getDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');

const deleteSurvey = async (id) => {
  const db = getDb();
  const surveysCollection = db.collection('Surveys');
  try {
    const queryResult = await surveysCollection.deleteOne({
      _id: ObjectID(id),
    });

    if (queryResult.result.ok !== 1) {
      return new Error('Query not acknowledged');
    }
    return 'success';
  } catch (e) {
    console.warn("There's been an error doing the survey query");
    return new Error(e.message);
  }
};

module.exports = deleteSurvey;
