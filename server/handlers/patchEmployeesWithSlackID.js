const updateEmployeesWithSlackID = require('../queries/updateEmployeesWithSlackID');

const patchEmployeesWithSlackID = async (req, res) => {
  const employeeID = req.params.email;
  const slackID = req.params.slackID;
  try {
    const result = await updateEmployeesWithSlackID(email, slackID);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = patchEmployeesWithSlackID;
