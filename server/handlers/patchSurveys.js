const Joi = require('joi');
const addResponse = require('../queries/addResponse');
const patchSurveys = (req, res) => {
  //TODO proper joi validation
  console.log('Reached patchSurveys handler');
  const responseObject = req.body;
  console.log('Response object: ', responseObject);
  const responseObjectSchema = Joi.object();
  Joi.validate(responseObject, responseObjectSchema, async (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      try {
        const { employeeId, surveyId, anonymous, answers } = responseObject;

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
  });

  const { employeeId, answers } = req.body;
};

module.exports = patchSurveys;
