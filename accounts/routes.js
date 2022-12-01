const express = require("express");
const router = express.Router();

const AccountController = require("./controller");

router.get("/", (req, res) => {
  console.log(req.query);
  const { email, password } = req.query; // TODO: sessions
  if (!email || !password) {
    return res.status(400).send("Missing email or password");
  }
  AccountController.getOne({ email, password }, (err, account) => {
    console.log(err);
    if (err) {
      return res.status(403).send(err.message);
    }
    return res.status(200).send(account);
  });
});

router.get("/all", (req, res) => {
  AccountController.getAll(function (err, foundAccounts) {
    if (err) {
      return res.send(err);
    }

    res.send(foundAccounts);
  });
});

router.post("/create", (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  if (!email || !password) return res.sendStatus(400);

  AccountController.create({ email, password }, (err, newAccount) => {
    if (err) {
      console.error(err);
      return res.status(403).send(err);
    }

    res.status(201).send(newAccount);
  });
});

module.exports = router;
