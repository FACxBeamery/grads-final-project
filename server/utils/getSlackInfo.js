// for each employee name, get the slack id API call

// for each slack id get the matching IM  channel API Call
const axios = require('axios');
const slackOAuthToken =
  process.env.SLACK_OAUTH ||
  'xoxp-2310897947-747838458775-861346852951-d6af1eeb3008cdda035795dc3ece15d9';

const getSlackIDForUser = async (userEmail) => {
  const slackIDURL = `https://slack.com/api/users.list?token=${slackOAuthToken}&email=${userEmail}`;
  const slackID = await axios
    .get(slackIDURL)
    .then((response) => response.id)
    .catch((error) => {
      console.log(error);
    });

  return slackID;
};

const openIMChannel = async (slackID) => {
  const slackIMOpenURL = `https://slack.com/api/im.open?token=${slackOAuthToken}&user=${slackID}`;
  const openIMChannel = await axios
    .post(slackIMOpenURL)
    .then((response) => response.channel.id)
    .catch((error) => {
      console.log(error);
    });
  return openIMChannel;
};

const getSlackIMChannels = async () => {
  const slackIMChannelURL = `https://slack.com/api/im.list?token=${slackOAuthToken}`;
  const IMChannels = await axios
    .post(slackIMChannelURL)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });

  return IMChannels;
};

module.exports = { getSlackIDForUser, openIMChannel, getSlackIMChannels };
