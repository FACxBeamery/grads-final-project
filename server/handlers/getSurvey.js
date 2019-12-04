const readSurvey = require('../queries/readSurvey');

const getSurvey = async (req, res) => {
  try {
    const result = await readSurvey(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = getSurvey;
