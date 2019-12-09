// const { getDb } = require('../databaseConnection');
const { getDb } = require('../databaseConnection');

const addSlackInfo = async (employeeEmail, slackIDToAdd) => {
  const db = getDb();
  const EmployeesCollection = await db.collection('Employees');

  try {
    const updateEmployee = EmployeesCollection.updateOne(
      { email: employeeEmail },
      { $push: { slackID: slackIDToAdd } },
    );

    return updateEmployee;
  } catch (err) {
    return err;
  }
};

module.exports = addSlackInfo;
