const express = require('express');

const router = express();

// const getSurveys = require('./handlers/getSurveys');
const postSurveys = require('./handlers/postSurveys');
// const patchSurveys = require('./handlers/patchSurveys');
// const postEmployees = require('./handlers/postEmployees');
// const getEmployees = require('./handlers/getEmployees');
const getAdmins = require('./handlers/getAdmins');
const postLogin = require('./handlers/postLogin');

router.get('/test', (req, res) =>
  res.status(200).send('Successful connection to back end!'),
);

<<<<<<< HEAD
router.post('/login', postLogin);
// router.get("/surveys", getSurveys)
=======
router.get('/surveys', getSurveys);
>>>>>>> master
router.post('/surveys', postSurveys);
// router.patch("/surveys", patchSurveys)
// router.get("/employees", getEmployees)
// router.post("/employees", postEmployees)
router.get('/admins', getAdmins);

module.exports = router;
