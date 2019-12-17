const Joi = require('@hapi/joi');
const passport = require('passport');
const updateSurvey = require('../queries/updateSurvey');

const schema = Joi.object({
  anonymous: Joi.bool(),

  answers: Joi.array()
    .items(
      Joi.object({
        questionId: Joi.string().required(),
        answer: Joi.string()
          .allow('')
          .required(),
        comment: Joi.string().allow(''),
      }),
    )
    .required(),

  employeeId: Joi.string().required(),
});

/*
anonymous: true
answers: [{questionId: "707f1f87bcf86dd799439011", answer: "good", comment: ""},…]
employeeId: "507f1f77bcf86cd799439013"
*/
const patchSurvey = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const addSurveyResponse = schema.validate(body).error === undefined;

    if (addSurveyResponse) {
      const result = await updateSurvey(id, body);
      return res.status(204).json(result);
    }

    return passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, info) => {
        if (err) {
          throw new Error(err);
        }

        if (info) {
          return res.status(401).json({ message: info.message });
        }

        if (user) {
          // success case. Can load up protected route.
          const result = await updateSurvey(id, body);
          return res.status(204).json(result);
        }

        return res.status(403).json({ message: 'No auth token' });
      },
    )(req, res, next);
  } catch (err) {
    return res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = patchSurvey;
