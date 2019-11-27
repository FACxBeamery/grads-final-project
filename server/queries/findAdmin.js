const { getDb } = require('../databaseConnection');

const findAdmin = async (username) => {
  const db = getDb();
  const adminsCollection = await db.collection('Admins');
  try {
    return await adminsCollection.findOne({
      username: username,
      type: 'admin',
    });
  } catch (e) {
    return new Error(e.message);
  }
};

module.exports = findAdmin;
