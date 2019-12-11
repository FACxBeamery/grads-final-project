const { getDb } = require('../databaseConnection');
const readUsers = async () => {
  try {
    const db = getDb();
    console.log('surveys', db);

    const surveys = db.collection('Surveys');
    const result = await surveys.find().toArray();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = readUsers;
