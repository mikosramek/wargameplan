const express = require("express");
const router = express.Router({ mergeParams: true });
const StepsController = require("./controller");
const ArmyController = require("../armies/controller");

router.use("/", (req, res, next) => {
  const { accountId, armyId } = req.params;
  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (isOwner) {
      next();
    } else {
      return res.status(403).send("Army not owned by account.");
    }
  });
});

router.get("/", (req, res) => {
  const { armyId } = req.params;
  StepsController.getArmySteps({ armyId }, (err, armies) => {
    if (err) return res.status(400).send(err.message);
    else return res.status(200).send(armies);
  });
});

router.post("/create", (req, res) => {
  const { armyId } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).send("Step name required");

  StepsController.create({ name, armyId }, (err, newStep) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    return res.status(201).send(newStep);
  });
});

router.post("/:stepId/new-rule", (req, res) => {
  const { stepId } = req.params;
  const { name, text } = req.body;
  if (!name || !text)
    return res.status(400).send("Rule name and text required");

  StepsController.createRule({ stepId, name, text }, (err, updatedSteps) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    return res.status(201).send(updatedSteps);
  });
});

router.delete("/:stepId/:ruleId", (req, res) => {
  const { stepId, ruleId } = req.params;

  StepController.deleteRule({ stepId, ruleId }, (err, updatedSteps) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
    return res.status(200).send(updatedSteps);
  });
});

module.exports = router;
