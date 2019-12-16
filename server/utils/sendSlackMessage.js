const axios = require('axios');
const SLACK_OAUTH = require('./getSLACK_OAUTH')();

const sendSlackMessage = async (slackID, customMessage) => {
  const slackPostMessageURL = `https://slack.com/api/chat.postMessage?token=${SLACK_OAUTH}&channel=${slackID}&text=${customMessage}`;
  try {
    await axios.post(slackPostMessageURL);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

module.exports = sendSlackMessage;
