const { getDb } = require('../databaseConnection');

const findAdminByCredentials = async (username, password) => {
  const db = await getDb();
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

module.exports = findAdminByCredentials;
