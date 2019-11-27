/* eslint-disable no-console */
const getMONGO_URI = () => {
  try {
    if (process.env.MONGO_URI === undefined)
      throw new Error('MONGO_URI environment variable not configured.');

    return process.env.MONGO_URI;
  } catch (err) {
    console.error(err);
    console.error('Exiting system with error code 1.');
    return process.exit(1);
  }
};

module.exports = getMONGO_URI;
