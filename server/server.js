/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const passportStrategies = require('./config/passport')(passport);
const router = require('./router.js');
const { initDb } = require('./databaseConnection.js');

const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passportStrategies.initialize());
app.use(router);

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`API up and running on port ${port}.`);
    });
  })
  .catch((error) =>
    console.error(`An error occured when starting Express server: ${error}.`),
  );
