/* eslint-disable prefer-destructuring */
const passport = require('passport');

const sendSlackMessage = require('../utils/sendSlackMessage');

const postSlackMessage = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      res.status(401).json({ message: info.message });
    }
    if (user) {
      try {
        const slackID = req.body.slackID;

        const message = req.body.message;

        const result = await sendSlackMessage(slackID, message);

        if (result.ok) {
          return res.status(200).json(result);
        }
        return res.status(404).json(result);
      } catch (error) {
        return res
          .status(500)
          .json(
            "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
          );
      }
    }
    return res.status(403).json({ message: "The JWT token isn't valid." });
  })(req, res, next);
};

module.exports = postSlackMessage;
