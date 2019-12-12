const axios = require('axios');
const SLACK_OAUTH = require('./getSLACK_OAUTH')();

const sendSlackMessage = (slackID, customMessage) => {
  const slackPostMessageURL = `https://slack.com/api/chat.postMessage?token=${SLACK_OAUTH}&channel=${slackID}&text=${customMessage}`;

  axios.post(slackPostMessageURL);
};

module.exports = sendSlackMessage;
