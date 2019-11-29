const readEmployees = require('../queries/readEmployees');

const getEmployees = async (req, res) => {
  try {
    const pageSize = Number(req.params.pagesize);
    const pageNumber = Number(req.params.pagenumber);
    const result = await readEmployees(pageSize, pageNumber);
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
