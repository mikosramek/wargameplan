const { execSync } = require("child_process");
const express = require("express");
const { validateRequestSecret } = require("../utils/secrets");

const router = express.Router();

const IS_DEV = process.env.NODE_ENV === "dev";

router.post("/release", async (req, res) => {
  let sentResponse = false;
  try {
    console.log("VALIDATING HOOK SECRET");
    validateRequestSecret(req);

    console.log("PULLING FROM MAIN");
    await execSync("git pull origin main");

    console.log("SENDING SUCCESS");
    res.sendStatus(204);
    sentResponse = true;

    console.log("RESTARTING PM2 SERVICE");
    await execSync(
      `pm2 restart ./ecosystem.config.js ${IS_DEV ? "" : "--env production"}`
    );
  } catch (err) {
    console.error(err);
    if (!sentResponse) {
      return res.status(500).send(err.message);
    }
  }
});

module.exports = router;
