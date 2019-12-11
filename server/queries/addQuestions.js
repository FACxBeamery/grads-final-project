const { getDb } = require('../databaseConnection');

const addQuestions = async (questionsArray) => {
  const db = getDb();
  const questionsCollection = await db.collection('Questions');

  try {
    const returnFromQuery = await questionsCollection.insertMany(
      questionsArray,
    );

    const querySuccessful = returnFromQuery.result.ok === 1;
    if (querySuccessful) {
      const insertedIds = Object.values(returnFromQuery.insertedIds);
      return insertedIds; // array of ObjectIds for each question
    }
    return new Error('Query not acknowledged');
  } catch (e) {
    return new Error(e.message);
  }
};

module.exports = addQuestions;
