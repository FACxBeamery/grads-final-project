const axios = require('axios');
const addSlackInfo = require('./addSlackInfo');
const SLACK_OAUTH = require('../utils/getSLACK_OAUTH')();

const updateEmployeesWithSlackID = async (db) => {
  const allEmployees = await db
    .collection('Employees')
    .find({})
    .toArray();

  const allEmployeeEmails = allEmployees.map((employee) => employee.email);

  const addSlackIDtoEmployee = async (email) => {
    const slackIDURL = `https://slack.com/api/users.lookupByEmail?token=${SLACK_OAUTH}&email=${email}`;
    try {
      const response = await axios.get(slackIDURL);

      if (response && response.data.user) {
        const slackID = response.data.user.id;
        addSlackInfo(db, email, slackID);
        return response.data.user.id;
      }
      return null;
    } catch (error) {
      return error;
      // eslint-disable-next-line no-console
      // console.log(error);
    }
  };

  allEmployeeEmails.map((email) => addSlackIDtoEmployee(email));
};

module.exports = updateEmployeesWithSlackID;
