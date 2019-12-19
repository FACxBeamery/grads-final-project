const passport = require('passport');
const surveySchema = require('../schemas/surveySchema');
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
      const { body } = req;
      const survey = body;
      const { questions } = survey;
      try {
        const questionIdsObject = await addQuestions(questions);
        const questionIds = Object.values(questionIdsObject);

        const surveyIsValid = surveySchema.validate(survey);

        if (!surveyIsValid.error) {
          const postResult = await addSurvey(survey, questionIds);
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
