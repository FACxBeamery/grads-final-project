const express = require("express");
const router = express();

router.get("/test", (req, res) =>
    res.status(200).send("Successful connection to back end!")
);

module.exports = router;
