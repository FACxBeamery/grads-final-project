const express = require('express');

const router = express();

const getSurveys = require('./handlers/getSurveys');
const getSurvey = require('./handlers/getSurvey');
const postSurveys = require('./handlers/postSurveys');
const patchSurvey = require('./handlers/patchSurvey');
// const postEmployees = require('./handlers/postEmployees');
// const getEmployees = require('./handlers/getEmployees');
const getAdmins = require('./handlers/getAdmins');
const postLogin = require('./handlers/postLogin');

router.get('/test', (req, res) =>
  res.status(200).send('Successful connection to back end!'),
);

router.post('/login', postLogin);
// router.get("/surveys", getSurveys)
router.patch('/surveys/:id', patchSurvey);
router.get('/surveys/:id', getSurvey);
router.get('/surveys', getSurveys);
router.post('/surveys', postSurveys);
// router.get("/employees", getEmployees)
// router.post("/employees", postEmployees)
router.get('/admins', getAdmins);

module.exports = router;
