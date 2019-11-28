const { getDb } = require('../databaseConnection');

const addQuestions = async (questionsArray) => {
  const db = getDb();
  const questionsCollection = await db.collection('Questions');

  try {
    const { insertedIds } = await questionsCollection.insertMany(
      questionsArray,
    );

    if (insertedIds) {
      console.log('Questions added to DB!');
      return insertedIds; // array of ObjectIds for each question
    } else {
      console.log('Questions not added to DB!');

      return new Error('Query not acknowledged');
    }
  } catch (e) {
    console.log('Error adding to questions collection');
    return new Error(e.message);
  }
};

module.exports = addQuestions;
