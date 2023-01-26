const express = require("express");
const router = express.Router({ mergeParams: true });
const StepsController = require("./controller");
const ArmyController = require("../armies/controller");

router.use("/", (req, res, next) => {
  const { armyId } = req.body;
  const { accountid: accountId } = req.headers;
  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (isOwner) {
      next();
    } else {
      return res.status(403).send("Army not owned by account.");
    }
  });
});

router.post("/create", (req, res) => {
  const { name, text, stepId } = req.body;
  if (!name || !text)
    return res.status(400).send("Rule name and text required");

  StepsController.createRule({ stepId, name, text }, (err, updatedRules) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    return res.status(201).send(updatedRules);
  });
});

router.delete("/remove", (req, res) => {
  const { stepId, ruleId } = req.body;

  StepsController.deleteRule({ stepId, ruleId }, (err, updatedRules) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    return res.status(200).send(updatedRules);
  });
});

router.patch("/order", (req, res) => {
  const { stepId, ruleId, direction } = req.body;

  if (!stepId || !ruleId)
    return res.status(400).send("Required data is missing");

  if (Math.abs(direction) !== 1)
    return res.status(400).send("direction missing or invalid");

  StepsController.moveRule(
    { stepId, ruleId, direction: parseInt(direction) },
    (err, updatedRules) => {
      if (err) return res.status(500).send(err.message);
      return res.status(200).send(updatedRules);
    }
  );
});

module.exports = router;
