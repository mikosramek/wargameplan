const express = require("express");
const router = express.Router({ mergeParams: true });
const StepsController = require("./controller");
const ArmyController = require("../armies/controller");

router.get("/:armyId", (req, res) => {
  const { armyId } = req.params;
  const { accountid: accountId } = req.headers;
  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (!isOwner) return res.status(403).send("Army not owned by account.");

    StepsController.getArmySteps({ armyId }, (err, armies) => {
      if (err) return res.status(400).send(err.message);
      else return res.status(200).send(armies);
    });
  });
});

router.post("/create", (req, res) => {
  const { name, armyId } = req.body;
  const { accountid: accountId } = req.headers;
  if (!name) return res.status(400).send("Step name required");

  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (!isOwner) return res.status(403).send("Army not owned by account.");

    StepsController.create({ name, armyId }, (err, newStep) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      return res.status(201).send(newStep);
    });
  });
});

router.delete("/remove", (req, res) => {
  const { stepId, armyId } = req.body;
  const { accountid: accountId } = req.headers;
  if (!stepId) return res.status(400).send("Step id required");

  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (!isOwner) return res.status(403).send("Army not owned by account.");

    StepsController.deleteStep({ stepId }, (err, stepRemoved) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }
      if (stepRemoved === null) {
        return res.status(400).send("Step not found");
      }
      return res.status(201).send({ armyId, stepIdRemoved: stepRemoved._id });
    });
  });
});

router.patch("/order", (req, res) => {
  const { stepId, armyId, direction } = req.body;
  const { accountid: accountId } = req.headers;

  if (!stepId || !armyId)
    return res.status(400).send("Required data is missing");

  if (Math.abs(direction) !== 1)
    return res.status(400).send("direction missing or invalid");

  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (!isOwner) return res.status(403).send("Army not owned by account.");

    StepsController.moveStep(
      { stepId, direction: parseInt(direction), armyId },
      (err, updatedSteps) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        return res.status(200).send(updatedSteps);
      }
    );
  });
});

module.exports = router;
