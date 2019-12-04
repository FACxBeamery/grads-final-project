const readSurvey = require('../queries/readSurvey');

const getSurvey = async (req, res) => {
  try {
    // console.log('req.params: ', req.params);
    // const result = await readSurvey(id);
    // res.status(200).json(result);
    // res.status(200).json(req.params);
  } catch (err) {
    res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = getSurvey;
