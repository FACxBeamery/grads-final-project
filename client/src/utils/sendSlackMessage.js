import axios from 'axios';

const sendSlackMessage = (slackID, customMessage) => {
  const slackOAuthToken = process.env.SLACK_OAUTH;

  const slackPostMessageURL = `https://slack.com/api/chat.postMessage?token=${slackOAuthToken}&channel=${slackID}&text=${customMessage}`;
  //TODO need to check if we need to change the custom message into the right format to be sent as a param?

  https: axios.post(slackPostMessageURL);
};

export default sendSlackMessage;
