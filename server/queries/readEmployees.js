const { getDb } = require('../databaseConnection');

//Using this resource https://arpitbhayani.me/blogs/benchmark-and-compare-pagination-approach-in-mongodb
// Decided to use skip and limit approach due to the size of the data set.

const readEmployees = async (pageSize, pageNumber) => {
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

module.exports = readEmployees;
