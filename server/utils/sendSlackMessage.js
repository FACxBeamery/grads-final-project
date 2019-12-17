const axios = require('axios');
const SLACK_OAUTH = require('./getSLACK_OAUTH')();

// eslint-disable-next-line consistent-return
const sendSlackMessage = async (slackID, customMessage) => {
  const slackPostMessageURL = `https://slack.com/api/chat.postMessage?token=${SLACK_OAUTH}&channel=${slackID}&text=${customMessage}`;
  try {
    const response = await axios.post(slackPostMessageURL);
    return response;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error();
  }
};

module.exports = sendSlackMessage;
