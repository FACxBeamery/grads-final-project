/* eslint-disable no-console */
const getJWTSecret = () => {
  try {
    if (!process.env.JWT_SECRET)
      throw new Error('JWT_SECRET environment variable not configured.');

    return process.env.JWT_SECRET;
  } catch (err) {
    console.error(err);
    console.error('Exiting system with error code 1.');

    return process.exit(1);
  }
};

module.exports = getJWTSecret;
