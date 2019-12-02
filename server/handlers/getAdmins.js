const passport = require('passport');

const getAdmins = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      res.status(401).json({ message: info.message });
    } else if (user.username === req.query.username) {
      if (user) {
        // success case. Can load up protected route.
        res.status(200).json({ message: 'Protected route accessed!' });
      } else {
        res
          .status(401)
          .json({ message: 'No authorised user exists with that username.' });
      }
    } else {
      res.status(403).json({ message: "The JWT token isn't valid." });
    }
  })(req, res, next);
};

module.exports = getAdmins;
