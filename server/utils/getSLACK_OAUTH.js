/* eslint-disable no-console */
/* eslint-disable camelcase */
const getSLACK_OAUTH = () => {
  try {
    if (!process.env.SLACK_OAUTH)
      throw new Error('SLACK_OAUTH environment variable not configured.');

    return process.env.SLACK_OAUTH;
  } catch (err) {
    console.error(err);
    console.error('Exiting system with error code 1.');
    return process.exit(1);
  }
};

module.exports = getSLACK_OAUTH;
