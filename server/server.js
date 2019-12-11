/* eslint-disable no-console */
/* eslint-disable camelcase */
const app = require('./app');
const getNODE_ENV = require('./utils/getNODE_ENV');
const { initDb } = require('./databaseConnection.js');

const port = process.env.PORT || 4000;

if (getNODE_ENV() !== 'test') {
  initDb()
    .then(() => {
      app.listen(port, () => {
        console.log(`API up and running on port ${port}.`);
      });
    })
    .catch((error) =>
      console.error(`An error occured when starting Express server: ${error}.`),
    );
}
