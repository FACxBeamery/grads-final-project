const { getDb } = require('../databaseConnection');

const updateSurveyStatus = async (id, newSurveyChanges) => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const result = await surveys.update(
      {
        id: id,
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
