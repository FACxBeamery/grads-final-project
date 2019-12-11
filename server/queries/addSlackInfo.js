//const { getDb } = require('../databaseConnection');

const addSlackInfo = async (db, employeeEmail, slackIDToAdd) => {
  const EmployeesCollection = await db.collection('Employees');

  try {
    const updateEmployee = EmployeesCollection.updateOne(
      { email: employeeEmail },
      { $set: { slackID: slackIDToAdd } },
    );

    return updateEmployee;
  } catch (err) {
    return err;
  }
};

module.exports = addSlackInfo;
