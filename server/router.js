const express = require('express');

const router = express();

const getSurveys = require('./handlers/getSurveys');
const patchSurvey = require('./handlers/patchSurvey');
const getSurveyAndQuestions = require('./handlers/getSurveyAndQuestions');
// const patchSurveys = require('./handlers/patchSurveys');
const getSurvey = require('./handlers/getSurvey');
const postSurveys = require('./handlers/postSurveys');
const { getEmployees } = require('./handlers/getEmployees');
const postSlackMessage = require('./handlers/postSlackMessage');

// const postEmployees = require('./handlers/postEmployees');

const getAdmins = require('./handlers/getAdmins');
const postLogin = require('./handlers/postLogin');

router.get('/test', (req, res) =>
  res.status(200).send('Successful connection to back end!'),
);

// router.get("/surveys", getSurveys)

// TODO change this endpoint when survey routes are protected
router.get('/surveys:id', getSurveyAndQuestions);

router.post('/login', postLogin);
// router.get("/surveys", getSurveys)
router.patch('/surveys/:id', patchSurvey);
router.get('/surveys/:id', getSurvey);
router.get('/surveys', getSurveys);

router.post('/surveys', postSurveys);

// router.get('/employees/:pagesize/:pagenumber', getPaginatedEmployees);

router.get('/employees', getEmployees);
// router.post("/employees", postEmployees)
router.get('/admins', getAdmins);
router.post('/slack', postSlackMessage);

module.exports = router;
