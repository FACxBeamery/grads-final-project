/* eslint-disable no-console */
const passport = require('passport');
const jwt = require('jsonwebtoken');
const getJWTSecret = require('../utils/getJWTSecret');

const postLogin = (req, res, next) => {
  console.log('before passport authenticate');
  passport.authenticate(
    'login',
    {
      // failureRedirect: '/user/login',
      badRequestMessage: 'Username and/or password cannot be empty!', // replaces Missing credentials
      // failureFlash: true,
    },
    (err, users, info) => {
      console.log('request from inside postLogin', req);
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
        } else if (users) {
          // todos: stubbed but mongo call required.
          const user = { id: 1 }; // todos: will be the admins id from mongo.

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
