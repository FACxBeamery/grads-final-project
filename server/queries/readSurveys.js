const { getDb } = require('../databaseConnection');
const readUsers = async () => {
  try {
    const db = getDb();
    const surveys = db.collection('Surveys');
    const result = await surveys.find().toArray();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = readUsers;
