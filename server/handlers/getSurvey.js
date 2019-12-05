const readSurvey = require('../queries/readSurvey');

const getSurvey = async (req, res) => {
  try {
    //checks if params contains key id or if params itself is just one string
    let id = !req.params.id ? req.params : req.params.id;
    const result = await readSurvey(id.toString());
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
