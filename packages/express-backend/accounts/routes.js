const express = require("express");
const router = express.Router();

const AccountController = require("./controller");
const SessionController = require("../sessions/controller");

router.get("/", (req, res) => {
  const { email, password, sessionId } = req.query;

  if (sessionId) {
    AccountController.loginViaSession({ sessionId }, (err, account) => {
      if (err) {
        return res.status(403).send(err.message);
      }
      return res.status(200).send(account);
    });
  } else if (email && password) {
    AccountController.getOne({ email, password }, (err, account) => {
      if (err) {
        return res.status(403).send(err.message);
      }
      return res.status(200).send(account);
    });
  } else {
    return res.status(400).send("Missing credentials");
  }
});

router.post("/create", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);

  AccountController.create({ email, password }, (err, newAccount) => {
    if (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(403).send("Email already in use");
      }
      return res.status(403).send("An error occurred");
    }

    res.status(201).send(newAccount);
  });
});

router.post("/signout", (req, res) => {
  const { accountid: accountId, sessionid: sessionId } = req.headers;
  SessionController.revoke({ sessionId, accountId }, (err) => {
    if (err) {
      console.error(err);
      return res.status(403).send(err.message);
    }
    res.sendStatus(204);
  });
});

module.exports = router;
