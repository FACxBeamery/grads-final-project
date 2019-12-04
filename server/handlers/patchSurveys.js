const Joi = require('@hapi/joi');
const addResponse = require('../queries/addResponse');
const patchSurveys = async (req, res) => {
  const surveyResponse = req.body;

  const surveyResponseSchema = Joi.object().keys({
    employeeId: Joi.string(),
    surveyId: Joi.string(),
    anonymous: Joi.boolean(),
    answers: Joi.array().items(
      Joi.object().keys({
        questionId: Joi.array().items(
          Joi.object().keys({
            questionId: Joi.string(),
            response: Joi.string(),
            comment: Joi.string(),
          }),
        ),
      }),
    ),
  });

  Joi.validate(surveyResponse, surveyResponseSchema, async (err, result) => {
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
};

module.exports = patchSurveys;
