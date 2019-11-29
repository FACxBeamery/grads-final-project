const { ObjectID } = require('mongodb');
const { getDb } = require('../databaseConnection');

const findAdminById = async (_id) => {
  const db = await getDb();
  const adminsCollection = await db.collection('Admins');
  try {
    return await adminsCollection.findOne({
      _id: ObjectID(_id),
      type: 'admin',
    });
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = findAdminById;
