const axios = require('axios');
const SLACK_OAUTH = require('./getSLACK_OAUTH')();

const sendSlackMessage = async (slackID, customMessage) => {
  const slackPostMessageURL = `https://slack.com/api/chat.postMessage?token=${SLACK_OAUTH}&channel=${slackID}&text=${customMessage}`;
  try {
    const { data } = await axios.post(slackPostMessageURL);
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = sendSlackMessage;
