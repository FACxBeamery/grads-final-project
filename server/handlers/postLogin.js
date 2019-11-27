const passport = require('passport');
const jwt = require('jsonwebtoken');
const getJWTSecret = require('../utils/getJWTSecret');

const postLogin = (req, res, next) => {
  passport.authenticate(
    'login',
    {
      // failureRedirect: '/user/login',
      badRequestMessage: 'Username and/or password cannot be empty!', // replaces Missing credentials
      // failureFlash: true,
    },
    (err, user, info) => {
      try {
        const jwtSecret = getJWTSecret();
        if (err) {
          throw new Error(err);
        }
        if (info !== undefined) {
          if (
            info.message === 'Empty username.' ||
            info.message === 'Empty password.'
          ) {
            res.status(401).send(info.message);
          }

          res.status(403).send(info.message);
        } else if (user) {
          const token = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: 60 * 60,
          });
          res.status(200).json({
            auth: true,
            token,
            message: 'Credentials verified and user logged in.',
          });
        } else {
          res.status(403).send('User could not be authenticated.');
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  )(req, res, next);
};

module.exports = postLogin;
