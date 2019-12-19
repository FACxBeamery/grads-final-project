const Joi = require('@hapi/joi');

const passport = require('passport');
const addQuestions = require('../queries/addQuestions');
const addSurvey = require('../queries/addSurvey');

const postSurveys = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      return res.status(401).json({ message: info.message });
    }
    if (user) {
      // eslint-disable-next-line no-unused-vars
      const surveyObjectSchema = Joi.object().keys({
        title: Joi.string() // !_id is not allowed under this schema!
          .min(2)
          .max(60)
          .required(),
        description: Joi.string()
          .min(2)
          .max(280)
          .required(),
        disclaimer: Joi.string()
          .min(2)
          .max(1000)
          .required(),
        status: Joi.string().valid('draft', 'active', 'closed'),
        dateCreated: Joi.alternatives()
          .try(Joi.string().valid(''), Joi.number().integer())
          .required(),
        dateEdited: Joi.alternatives()
          .try(Joi.string().valid(''), Joi.number().integer())
          .required(), // !can dateEdited = '' or is required?!
        // dateToPublish: Joi.alternatives()
        //   .try(Joi.string().valid(''), Joi.number().integer())
        //   .required(),
        datePublished: Joi.alternatives()
          .try(Joi.string().valid(''), Joi.number().integer())
          .required(),
        // dateToClose: Joi.alternatives()
        //   .try(Joi.string().valid(''), Joi.number().integer())
        //   .required(),
        dateClosed: Joi.alternatives()
          .try(Joi.string().valid(''), Joi.number().integer())
          .required(),
        anonymous: Joi.boolean().required(),
        recipients: Joi.array().items(
          Joi.object().keys({
            employeeId: Joi.string(),
            completed: Joi.boolean(),
          }),
        ),
        // questions: Joi.array().items(
        //   Joi.object().keys({ position: Joi.number().integer() }), // !do questions need a position anymore?!
        // ),
        questions: Joi.array(),
        responses: Joi.array().items(
          Joi.object().keys({
            employeeId: Joi.string(), // !not required because can be anonymous!
            answers: Joi.array().items(
              Joi.object().keys({
                questionId: Joi.string(),
                // answer: Joi.alternatives()
                //   .try(Joi.string(), Joi.number().integer()) // !can answer be an integer?!
                //   .required(),
                answer: Joi.string().required(),
                comment: Joi.string().allow(null),
              }),
            ),
          }),
        ),
      });

      const surveyObject = req.body;
      const { questions } = surveyObject;
      try {
        const questionIdsObject = await addQuestions(questions); // !does this need Joi validation also?!
        const questionIds = Object.values(questionIdsObject);

        const surveyIsValid = surveyObjectSchema.validate(surveyObject);

        if (!surveyIsValid.error) {
          const postResult = await addSurvey(surveyObject, questionIds);
          return res.status(200).json({ message: postResult });
        }
        throw Error(surveyIsValid.error);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    }

    return res.status(403).json({ message: "The JWT token isn't valid." });
  })(req, res, next);
};

module.exports = postSurveys;
