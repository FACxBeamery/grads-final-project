const Joi = require('@hapi/joi');
const addQuestions = require('../queries/addQuestions');
const createSurvey = require('../queries/createSurvey');

/* Survey schema:
    {
        id: ObjectID (auto generated)
        title: string
        description: string
        status: created/published/closed
        dateCreated: date
        dateToPublish: date
        datePublished: date
        dateToClose: date
        dateClosed: date
        anonymous: boolean
        recipients: [{employeeId: ObjectId completed: boolean}]
        questions: [{questionId: ObjectId position: int}]
        responses: [{
            employeeId: ObjectID (or null if anon.)
            answers: [{
                questionId: ObjectId
                answer: string/int (depends on question type)
                comment: null or string
                }]
        }]
    }
    */

const postSurveys = async (req, res) => {
  console.log('postSurveys handler running');

  const surveyObjectSchema = Joi.object();
  // !! ------ ONLY UNCOMMENT THIS ONCE SURVEY EDITOR IS FINISHED --- !!
  //   const surveyObjectSchema = Joi.object().keys({
  //     title: Joi.string()
  //       .min(5)
  //       .max(100)
  //       .required(),
  //     description: Joi.string()
  //       .min(5)
  //       .max(140)
  //       .required(),
  //     status: Joi.string().valid('created', 'published', 'closed'),
  //     dateCreated: Joi.string(),
  //     dateToPublish: Joi.string(),
  //     datePublished: Joi.string(),
  //     dateToClose: Joi.string(),
  //     dateClosed: Joi.string(),
  //     anonymous: Joi.boolean(),
  //     recipients: Joi.array().items(
  //       Joi.object().keys({ employeeId: Joi.string(), completed: Joi.boolean() }),
  //     ),
  //     questions: Joi.array().items(
  //       Joi.object().keys({ position: Joi.number().integer() }),
  //     ),
  //     responses: Joi.array().items(
  //       Joi.object().keys({
  //         answers: Joi.array().items(
  //           Joi.object().keys({
  //             answer: Joi.alternatives().try(Joi.number(), Joi.string()),
  //             comment: Joi.string().allow(null),
  //           }),
  //         ),
  //       }),
  //     ),
  //   });
  const surveyObject = req.body;
  const questions = surveyObject.questions;
  Joi.validate(surveyObj, surveyObjectSchema, async (err, result) => {
    if (err) {
      console.log('Joi validation failed');
      res.send(err.message);
    } else {
      try {
        const questionIdsObject = await addQuestions(questions);
        const questionIds = Object.values(questionIdsObject);
        await createSurvey(surveyObj, questionIds);
        res.sendStatus(200);
      } catch (e) {
        res.status(500).send(e.message);
      }
    }
  });
};

module.exports = postSurveys;
