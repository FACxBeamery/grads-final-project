const { getDb } = require('../databaseConnection');

const readEmployees = async () => {
  try {
    const db = getDb();
    const employees = db.collection('Employees');

    const result = await employees.find({}).toArray();
    return result;
  } catch (err) {
    return err;
  }
};

const readPaginatedEmployees = async (pageSize, pageNumber) => {
  try {
    const skips = pageSize * (pageNumber - 1);
    const db = getDb();
    const employees = db.collection('Employees');
    const result = await employees
      .find({})
      .skip(skips)
      .limit(pageSize)
      .toArray();

    return result;
  } catch (err) {
    return err;
  }
};

module.exports = { readEmployees, readPaginatedEmployees };
