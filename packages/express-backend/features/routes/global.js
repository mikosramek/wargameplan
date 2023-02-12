const express = require("express");
const router = express.Router();
const GlobalConfig = require("../controller/global");

router.get("/", (_req, res) => {
  res.status(200).send(GlobalConfig.getConfig());
});

module.exports = router;
