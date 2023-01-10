const express = require("express");
const router = express.Router({ mergeParams: true });
const StepsController = require("./controller");
const ArmyController = require("../armies/controller");

router.get("/:armyId", (req, res) => {
  const { armyId } = req.params;
  const { accountid: accountId } = req.headers;
  console.log({ armyId, accountId });
  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (isOwner) {
      StepsController.getArmySteps({ armyId }, (err, armies) => {
        if (err) return res.status(400).send(err.message);
        else return res.status(200).send(armies);
      });
    } else {
      return res.status(403).send("Army not owned by account.");
    }
  });
});

router.post("/create", (req, res) => {
  const { name, armyId } = req.body;
  const { accountid: accountId } = req.headers;
  if (!name) return res.status(400).send("Step name required");

  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (isOwner) {
      StepsController.create({ name, armyId }, (err, newStep) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err.message);
        }
        return res.status(201).send(newStep);
      });
    } else {
      return res.status(403).send("Army not owned by account.");
    }
  });
});

module.exports = router;
