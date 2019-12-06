const axios = require('axios');
const addSlackInfo = require('./addSlackInfo');
const readEmployees = require('./readEmployees');

const updateEmployeesWithSlackID = () => {
  const slackOAuthToken = process.env.SLACK_OAUTH;

  const getSlackIDForUser = async (userEmail) => {
    const slackIDURL = `https://slack.com/api/users.list?token=${slackOAuthToken}&email=${userEmail}`;
    const slackID = await axios
      .get(slackIDURL)
      .then((response) => response.id)
      .catch((error) => {
        console.log(error);
      });

    return slackID;
  };

  const allEmployees = readEmployees();

  const allEmployeeEmails = allEmployees.map((employee) => employee.email);

  const allSlackIDs = allEmployeeEmails.map((email) =>
    getSlackIDForUser(email),
  );

  return allEmployeeEmails.map((email, slackIDIndex) =>
    addSlackInfo(email, allSlackIDs[slackIDIndex]),
  );

  // for Each ID/email get the SlackID
  // then add the slack ID
};
module.exports = { updateEmployeesWithSlackID };
