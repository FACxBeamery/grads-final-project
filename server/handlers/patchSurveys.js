const Joi = require('@hapi/joi');
const addResponse = require('../queries/addResponse');
const patchSurveys = async (req, res) => {
  //TODO proper joi validation
  console.log('Reached patchSurveys handler');
  const responseObject = req.body;
  console.log('Response object: ', responseObject);

  const responseObjectSchema = Joi.object();
  const { error, value } = responseObjectSchema.validate(responseObject);

  if (error) {
    res.sendStatus(400);
  } else {
    try {
      const { employeeId, surveyId, anonymous, answers } = responseObject;
      console.log('employeeId: ', employeeId);
      await addResponse(employeeId, surveyId, anonymous, answers);
      res.sendStatus(200);
    } catch (err) {
      res
        .status(500)
        .send(
          "Sorry, we're having a problem on our end. Please speak to the engineering team.",
        );
    }
  }
};

module.exports = patchSurveys;
