const { getDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');

const updateSurveyStatus = async (_id, newSurveyChanges) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const result = await surveys.update(
      {
        _id: ObjectID(_id),
      },
      {
        $set: newSurveyChanges,
      },
    );
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = updateSurveyStatus;
