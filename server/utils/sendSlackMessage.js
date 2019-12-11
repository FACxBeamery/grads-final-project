const axios = require('axios');

const sendSlackMessage = (slackID, customMessage) => {
  const slackOAuthToken = process.env.SLACK_OAUTH;

  const slackPostMessageURL = `https://slack.com/api/chat.postMessage?token=${slackOAuthToken}&channel=${slackID}&text=${customMessage}`;

  axios.post(slackPostMessageURL);
};

module.exports = sendSlackMessage;
