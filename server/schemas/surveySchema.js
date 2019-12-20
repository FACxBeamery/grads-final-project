const Joi = require('@hapi/joi');

const surveyObjectSchema = Joi.object().keys({
  title: Joi.string()
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
    .try(Joi.string(), Joi.number())
    .required(),
  dateEdited: Joi.alternatives()
    .try(Joi.string(), Joi.number(), Joi.date())
    .allow(null),
  datePublished: Joi.alternatives()
    .try(Joi.string(), Joi.number(), Joi.date())
    .allow(null),
  dateClosed: Joi.alternatives()
    .try(Joi.string(), Joi.number(), Joi.date())
    .allow(null),
  anonymous: Joi.boolean().required(),
  recipients: Joi.array().items(
    Joi.object().keys({
      employeeId: Joi.string(),
      completed: Joi.boolean(),
    }),
  ),
  recipientIds: Joi.array().allow(null),
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

module.exports = surveyObjectSchema;
