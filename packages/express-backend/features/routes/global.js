const express = require("express");
const router = express.Router();
const config = require("../config.global.json");

router.get("/", (req, res) => {
  res.status(200).send(config);
});

module.exports = router;
