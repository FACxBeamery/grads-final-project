/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const deleteSurvey = require('../queries/deleteSurvey');

const removeSurvey = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      res.status(401).json({ message: info.message });
    }
    if (user) {
      try {
        const { id } = req.params;
        const result = await deleteSurvey(id);
        res.status(200).json(result);
      } catch (error) {
        res
          .status(500)
          .json(
            "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
          );
      }
    }
    return res.status(403).json({ message: "The JWT token isn't valid." });
  })(req, res, next);
};
module.exports = removeSurvey;
