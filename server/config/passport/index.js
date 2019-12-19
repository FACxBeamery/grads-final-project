/* istanbul ignore file */

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const findAdminByCredentials = require('../../queries/findAdminByCredentials');
const findAdminById = require('../../queries/findAdminById');

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
      async (username, password, done) => {
        try {
          if (username === undefined) {
            return done(null, false, { message: 'Empty username.' });
          }

          if (password === undefined) {
            return done(null, false, { message: 'Empty password.' });
          }
          // -----

          const result = await findAdminByCredentials(username, password); // result is the entire admin document (id, username, password, type, employeeId).

          if (result) {
            return done(null, result);
          }
          return done(null, false, {
            message: 'Bad credentials. Username and password do not match.',
          });
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
    new JWTStrategy(opts, async (jwtPayload, done) => {
      try {
        if (!jwtPayload) {
          done(null, null, { message: 'Invalid JWT provided.' });
        }
        const user = await findAdminById(jwtPayload.id); // result is the entire admin document (id, username, password, type, employeeId).
        if (user) {
          done(null, user);
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
