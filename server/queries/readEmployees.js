const { getDb } = require('../databaseConnection');
const readEmployees = async () => {
  try {
    const db = getDb();
    const employees = db.collection('Employees');
    const result = await surveys.find().toArray();
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = readEmployees;
