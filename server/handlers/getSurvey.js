/* eslint-ignore no-console */
const passport = require('passport');
const readSurvey = require('../queries/readSurvey');

const getSurvey = async (req, res, next) => {
  try {
    // checks if params contains key id or if params itself is just one string
    const { id } = req.params;
    const { responses } = req.query || { responses: false };

    const responsesRequested = responses === 'true';

    const respondWithSurveyData = async (withResponses) => {
      try {
        const result = await readSurvey(id.toString(), withResponses);
        return res.status(200).json(result);
      } catch (error) {
        throw Error({ message: 'Failed to read survey data.' });
      }
    };

    if (responsesRequested) {
      return passport.authenticate(
        'jwt',
        { session: false },
        (err, user, info) => {
          try {
            if (err) {
              throw new Error(err);
            }

            if (info) {
              return res.status(401).json({ message: info.message });
            }

            if (user) {
              // success case. Can load up protected route.
              return respondWithSurveyData(responsesRequested);
            }

            return res.status(403).json({ message: 'No auth token' });
          } catch (error) {
            return res.status(500).json({ message: error.message });
          }
        },
      )(req, res, next);
    }

    return respondWithSurveyData(false);
  } catch (err) {
    return res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = getSurvey;
