const { getDb } = require('../databaseConnection');

const addQuestions = async (questionsArray) => {
  const db = getDb();
  questionsCollection = db.collection('Questions');

  try {
    const { acknowledged, insertedIds } = await questionsCollection.insertMany(
      questionsArray,
    );
    if (acknowledged === true) {
      return insertedIds; // array of ObjectIds for each question
    } else {
      return new Error('Query not acknowledged');
    }
  } catch (e) {
    return new Error(e.message);
  }
};

module.exports = addQuestions;
