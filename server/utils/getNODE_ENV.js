/* eslint-disable no-console */
const getNODE_ENV = () => {
  try {
    if (process.env.NODE_ENV === undefined)
      throw new Error('NODE_ENV environment variable not configured.');

    return process.env.NODE_ENV;
  } catch (err) {
    console.error(err);
    console.error('Exiting system with error code 1.');
    return process.exit(1);
  }
};

module.exports = getNODE_ENV;
