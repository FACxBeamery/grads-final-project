/* eslint-disable no-console */
const passport = require('passport');
const csv = require('csv-parser');
const fs = require('fs');

const uploadCSV = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      return res.status(401).json({ message: info.message });
    }

    if (user) {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      const { sampleFile } = req.files.sampleFile;
      const { name } = sampleFile;

      // Use the mv() method to place the file somewhere on your server
      await sampleFile.mv(`${__dirname}/../../temp/${name}`);

      fs.createReadStream(`${__dirname}/../../temp/${name}`)
        .on('error', () => {
          // handle error
          console.log('error happened');
        })
        .pipe(csv({ delimiter: ',' }))
        .on('data', (row) => {
          console.log(row);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');

          return res.send('File uploaded and processed!');
        });
    } else {
      return res
        .status(401)
        .json({ message: 'No authorised user exists with that username.' });
    }

    return res.status(403).json({ message: "The JWT token isn't valid." });
  })(req, res, next);
};

module.exports = uploadCSV;
