const passport = require('passport');

const postAdmins = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info !== undefined) {
      res.status(401).send(info.message);
    } else if (user === req.query.username) {
      if (user) {
        // success case. Can load up protected route.
        res.status(200).send('Protected route accessed!');
      } else {
        res.status(401).send('No authorised user exists with that username.');
      }
    } else {
      res.send(403).send("The JWT token isn't valid.");
    }
  })(req, res, next);
};

module.exports = postAdmins;
