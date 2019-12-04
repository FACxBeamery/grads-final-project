const { getDb } = require('../databaseConnection');

const readSurvey = async (id) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const result = await surveys
      .findOne({
        id: id,
      })
      .toArray();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = readSurvey;
