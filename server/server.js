const express = require("express");
const app = express();
const router = require("./router.js");
const port = process.env.PORT || 4000;
const { getDb, initDb, closeDb } = require("./databaseConnection.js");

app.use(router);

initDb()
    .then(_db => {
        app.listen(port, () => {
            console.log(`API up and running on port ${port}.`);
        });
    })
    .catch(error =>
        console.error(
            `An error occured when starting Express server: ${error}.`
        )
    );
