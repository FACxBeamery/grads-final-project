const { getDb } = require('../databaseConnection');

const addSlackInfo = async (employeeEmail, slackIDToAdd) => {
  try {
    const db = getDb();
    const employees = await db.collection('Employees');

    const updateEmployee = employees.updateOne(
      { email: employeeEmail },
      { $set: { slackID: slackIDToAdd } },
    );
    return updateEmployee;
  } catch (err) {
    return err;
  }
};

module.exports = addSlackInfo;
