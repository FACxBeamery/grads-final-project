const passport = require('passport');

const postLogin = (req, res, next) => {
  passport.authenticate('login', (err, users, info) => {
    try {
      res.json({ message: 'success!' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })(req, res, next);
};

module.exports = postLogin;
