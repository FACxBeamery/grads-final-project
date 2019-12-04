const updateSurvey = require('../queries/updateSurvey');

const patchSurvey = async (req, res) => {
  try {
    console.log('req.body: ', req.body);
    const result = await updateSurvey(req.params.id, req.body);
    res.status(204).json(result);
  } catch (err) {
    res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = patchSurvey;
