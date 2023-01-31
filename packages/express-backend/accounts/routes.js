const express = require("express");
const router = express.Router();

const AccountController = require("./controller");

router.get("/", (req, res) => {
  const { email, password } = req.query; // TODO: sessions
  if (!email || !password) {
    return res.status(400).send("Missing email or password");
  }
  AccountController.getOne({ email, password }, (err, account) => {
    if (err) {
      return res.status(403).send(err.message);
    }
    return res.status(200).send(account);
  });
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

module.exports = router;
