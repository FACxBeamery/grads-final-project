const readSurveys = require('../queries/readSurveys');

const getSurveys = async (req, res) => {
  try {
    let result = await readSurveys();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

module.exports = getSurveys;
