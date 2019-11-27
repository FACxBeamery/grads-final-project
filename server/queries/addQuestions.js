const addQuestions = async (questionsArray, questionsCollection) => {
  try {
    const { acknowledged, insertedIds } = await questionsCollection.insertMany(
      questionsArray,
    );
  } catch (e) {
    return new Error(e.message);
  }

  if (acknowledged === true) {
    return insertedIds; // array of ObjectIds for each question
  } else {
    return new Error('Query not acknowledged');
  }
};
