const {
  readEmployees,
  readPaginatedEmployees,
} = require('../queries/readEmployees');

// Due to time constraints, pagination has not been used on the backend for now.
//The handler and query for pagination has been left in for later development.

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

const getPaginatedEmployees = async (req, res) => {
  try {
    const pageSize = Number(req.params.pagesize);
    const pageNumber = Number(req.params.pagenumber);
    const result = await readPaginatedEmployees(pageSize, pageNumber);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json(
        "We're experiencing some issues on our end. Please inform the engineers and we will get back to you",
      );
  }
};

module.exports = { getEmployees, getPaginatedEmployees };
