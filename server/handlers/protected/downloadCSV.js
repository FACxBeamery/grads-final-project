const passport = require('passport');
const { Parser } = require('json2csv');
const fs = require('fs');
const readSurvey = require('../../queries/readSurvey');

const downloadCSV = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      console.log('not authenticated');
      throw new Error(err);
    }
    if (info) {
      res.status(401).json({ message: info.message });
    } else if (user.username === req.query.username) {
      console.log('authenticated');
      if (user) {
        try {
          const id = !req.params.id ? req.params : req.params.id;
          const survey = await readSurvey(id.toString());
          const responses = survey.responses.map(
            (response) => response.answers,
          );
          console.log(responses);

          const arrayOfSizeResponses = new Array(responses.length);
          const fields = arrayOfSizeResponses.map(
            (item, index) => `Question ${index + 1}`,
          );

          const json2csvParser = new Parser({ fields });
          const csv = json2csvParser.parse(responses);

          console.log(csv);

          const file = `${__dirname}/../../temp/sample2return.csv`;

          fs.writeFileSync(file, csv);

          res.download(file, () =>
            fs.unlinkSync(file, (err2) => console.error(err2)),
          );
        } catch (err) {
          console.log('in catch');
          // do this
        }
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

module.exports = downloadCSV;
