const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const { ExtractJWT } = require('passport-jwt');

const getJWTSecret = require('../../utils/getJWTSecret');

module.exports = (passport) => {
  getJWTSecret();
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        done(null, 'test', null);
      },
    ),
  );

  return passport;
};
