const { getDb } = require('../databaseConnection');

const findAdmin = async (username, password) => {
  const db = getDb();
  const adminsCollection = await db.collection('Admins');
  try {
    return await adminsCollection.findOne({
      username,
      password,
      type: 'admin',
    });
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = findAdmin;
