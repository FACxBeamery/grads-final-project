const passport = require('passport');
const {
  readEmployees,
  readPaginatedEmployees,
} = require('../queries/readEmployees');

// Due to time constraints, pagination has not been used on the backend for now.
const getEmployees = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      return res.status(401).json({ message: info.message });
    }
    if (user) {
      try {
        const result = await readEmployees();
        return res.status(200).json(result);
      } catch (error) {
        return res
          .status(500)
          .json(
            "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
          );
      }
    }
    return res.status(403).json({ message: "The JWT token isn't valid." });
  })(req, res, next);
};

const getPaginatedEmployees = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      return res.status(401).json({ message: info.message });
    }
    if (user) {
      try {
        const pageSize = Number(req.params.pagesize);
        const pageNumber = Number(req.params.pagenumber);
        const result = await readPaginatedEmployees(pageSize, pageNumber);
        return res.status(200).json(result);
      } catch (error) {
        return res
          .status(500)
          .json(
            "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
          );
      }
    }
    return res.status(403).json({ message: "The JWT token isn't valid." });
  })(req, res, next);
};

module.exports = { getEmployees, getPaginatedEmployees };
