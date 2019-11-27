const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const getJWTSecret = require('../../utils/getJWTSecret');

module.exports = (passport) => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        try {
          console.log('username = ', username);
          console.log('password = ', password);
          if (username === undefined) {
            return done(null, false, { message: 'Empty username.' });
          }

          if (password === undefined) {
            return done(null, false, { message: 'Empty password.' });
          }

          if (username === 'test' && password === 'test') {
            return done(null, username);
          }

          if (username !== 'test' || password !== 'test') {
            return done(null, false, {
              message: 'Bad credentials. Username and password do not match.',
            });
          }

          return done(null, false, { message: 'Cannot authenticate user.' });
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: getJWTSecret(),
  };

  passport.use(
    'jwt',
    new JWTStrategy(opts, (jwtPayload, done) => {
      try {
        if (jwtPayload.id === 1) {
          // todo: check jwtPayload should equal the admin id.
          done(null, 'admin username');
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err);
      }
    }),
  );

  return passport;
};
