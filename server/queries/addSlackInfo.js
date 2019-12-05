// const { getDb } = require('../databaseConnection');
const { getDb } = require('../databaseConnection');
const ObjectID = require('mongodb').ObjectID;

const addSlackInfo = async (employeeID, slackID, IMChannelID) => {
  const db = getDb();
  const EmployeesCollection = await db.collection('Employees');

  try {
    const updateEmployee = EmployeesCollection.updateOne(
      { _id: ObjectID(employeeID) },
      { $push: { slackID: slackID, IMChannel: IMChannelID } },
    );
    return updateEmployee;
  } catch (err) {
    return err;
  }
};

module.exports = addSlackInfo;
