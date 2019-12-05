import axios from 'axios';

const sendSlackMessage = () => {
  const OAuthToken = '';
  const customMessage = '';
  //axios. get for IM CHANNEL ID

  const IMChannelId = '';
  const slackPostMessageURL = 'https://slack.com/api/chat.postMessage';
  axios.post(slackPostMessageURL);
};

export default sendSlackMessage;
