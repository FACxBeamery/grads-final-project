const passport = require('passport');
const { Parser } = require('json2csv');
const fs = require('fs');

const downloadCSV = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      res.status(401).json({ message: info.message });
    } else if (user.username === req.query.username) {
      if (user) {
        const fields = ['car', 'price', 'color'];
        const myCars = [
          {
            car: 'Audi',
            price: 40000,
            color: ['blue', 'white'],
          },
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(myCars);

        console.log(csv);

        const file = `${__dirname}/../../temp/sample2return.csv`;

        fs.writeFileSync(file, csv);

        res.download(file, () =>
          fs.unlinkSync(file, (err2) => console.error(err2)),
        );
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
