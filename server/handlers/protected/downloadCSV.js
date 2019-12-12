const passport = require('passport');
const { Parser } = require('json2csv');
const fs = require('fs');
const readSurvey = require('../../queries/readSurvey');
const readEmployees = require('../../queries/readEmployees');
const downloadCSV = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      throw new Error(err);
    }
    if (info) {
      res.status(401).json({ message: info.message });
    } else if (user.username === req.query.username) {
      if (user) {
        try {
          const id = !req.params.id ? req.params : req.params.id;
          const survey = await readSurvey(id.toString());
          const { responses, questions } = survey;

          const anonymous = survey.anonymous || req.params.anonymous;
          console.log(anonymous, 'ANONYMOUS');
          let employees;

          if (!anonymous) {
            employees = await readEmployees();
          }

          const fields = questions.reduce(
            (acc, question) =>
              question.commentEnabled
                ? [...acc, question.title, `Comment on ${question.title}`]
                : [...acc, question.title],
            [],
          );

          if (!anonymous) {
            fields.unshift('Name');
          }

          const responsesWithQuestionTitles = responses.map((response) => {
            const responseObj = {};
            if (!anonymous) {
              responseObj.Name = employees.find(
                (employee) => response.employeeId === employee._id,
              );
            }
            console.log(responseObj, 'RESP OBJ');
            response.answers.forEach((answer) => {
              const currentQuestion = questions.find((question) => {
                // eslint-disable-next-line no-underscore-dangle
                return question._id.equals(answer.questionId);
              });
              responseObj[currentQuestion.title] = answer.answer;

              if (currentQuestion.commentEnabled) {
                responseObj[`Comment on ${currentQuestion.title}`] =
                  answer.comment;
              }
            });
            return responseObj;
          });

          const json2csvParser = new Parser({ fields });
          const csv = json2csvParser.parse(responsesWithQuestionTitles);

          const file = `${__dirname}/../../temp/sample2return.csv`;

          fs.writeFileSync(file, csv);

          res.download(file, () =>
            // eslint-disable-next-line no-console
            fs.unlinkSync(file, (err2) => console.error(err2)),
          );
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      } else {
        res
          .status(401)
          .json({ message: 'No authorised user exists with that username.' });
      }
    } else {
      res.status(403).json({ message: "The JWT token isn't valid." });
    }
  })(req, res, next);
};

module.exports = downloadCSV;
