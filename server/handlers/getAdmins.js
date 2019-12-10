const passport = require('passport');

const getAdmins = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      throw new Error(err);
    }

    if (info) {
      return res.status(401).json({ message: info.message });
    }

    if (user) {
      // success case. Can load up protected route.
      return res.status(200).json({ message: 'Protected route accessed!' });
    }

    return res.status(403).json({ message: 'No auth token' });
  })(req, res, next);
};

module.exports = getAdmins;
