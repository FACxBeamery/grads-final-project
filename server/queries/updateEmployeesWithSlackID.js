const axios = require('axios');
const addSlackInfo = require('./addSlackInfo');

const updateEmployeesWithSlackID = async (db) => {
  const slackOAuthToken = process.env.SLACK_OAUTH;

  const allEmployees = await db
    .collection('Employees')
    .find({})
    .toArray();

  const allEmployeeEmails = allEmployees.map((employee) => employee.email);

  const addSlackIDtoEmployee = async (email) => {
    //console.log("I'm getting here");
    const slackIDURL = `https://slack.com/api/users.lookupByEmail?token=${slackOAuthToken}&email=${email}`;
    try {
      const response = await axios.get(slackIDURL);
      //console.log('RESPONSE', response.data);
      if (response && response.data.user) {
        const slackID = response.data.user.id;
        addSlackInfo(db, email, slackID);
      }
    } catch (error) {
      console.log(error);
    }
  };

  allEmployeeEmails.map((email) => addSlackIDtoEmployee(email));
};

module.exports = updateEmployeesWithSlackID;
