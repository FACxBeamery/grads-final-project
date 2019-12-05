const { getDb } = require('../databaseConnection');
const ObjectID = require('mongodb').ObjectID;

const readIMChannel = async (employeeEmailAddress) => {
  try {
    const db = getDb();
    const employeesCollection = await db.collection('Employees');
    let employee = await employeesCollection.findOne({
      email: employeeEmailAddress,
    });
    const IMChannel = employee.IMChannel;
    return IMChannel;
  }
};
module.exports = readIMChannel;
