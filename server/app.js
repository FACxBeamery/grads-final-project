/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const passportStrategies = require('./config/passport')(passport);
const router = require('./router.js');

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passportStrategies.initialize());
app.use(router);

module.exports = app;
