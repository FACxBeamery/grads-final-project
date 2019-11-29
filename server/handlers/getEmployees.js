const readEmployees = require('../queries/readEmployees');

const getEmployees = async (req, res) => {
  try {
    const result = await readEmployees();
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = getEmployees;
