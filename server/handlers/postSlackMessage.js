/* eslint-disable prefer-destructuring */
const sendSlackMessage = require('../utils/sendSlackMessage');

const postSlackMessage = async (req, res) => {
  try {
    const slackID = req.body.slackID;

    const message = req.body.message;

    const result = await sendSlackMessage(slackID, message);
    res.status(204).json(result);
  } catch (err) {
    res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = postSlackMessage;
