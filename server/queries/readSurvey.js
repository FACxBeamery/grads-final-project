const { getDb } = require('../databaseConnection');
const { ObjectID } = require('mongodb');

const readSurvey = async (_id) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const result = await surveys.findOne({
      _id: ObjectID(_id),
    });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = readSurvey;
