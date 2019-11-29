const express = require('express');
const router = express();

const getSurveys = require('./handlers/getSurveys');
const getSurveyAndQuestions = require('./handlers/getSurveyAndQuestions');
const postSurveys = require('./handlers/postSurveys');
const patchSurveys = require('./handlers/patchSurveys');
const postEmployees = require('./handlers/postEmployees');
const getEmployees = require('./handlers/getEmployees');
const postAdmins = require('./handlers/postAdmins');

router.get('/test', (req, res) =>
  res.status(200).send('Successful connection to back end!'),
);

// router.get("/surveys", getSurveys)
router.get('/surveys/:id', getSurveyAndQuestions);
router.post('/surveys', postSurveys);
router.patch('/surveys', patchSurveys);
// router.get("/employees", getEmployees)
// router.post("/employees", postEmployees)
// router.post("/admins", postAdmins)

module.exports = router;
