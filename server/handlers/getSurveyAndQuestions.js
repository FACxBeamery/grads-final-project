const readSurveyAndQuestions = require('../queries/readSurveyAndQuestions');

const getSurveyAndQuestions = async (req, res) => {
  const surveyId = req.params.id;
  try {
    const survey = await readSurveyAndQuestions(surveyId);

    res.status(200).json(survey);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = getSurveyAndQuestions;
