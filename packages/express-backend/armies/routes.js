const express = require("express");
const router = express.Router({ mergeParams: true });
const ArmyController = require("./controller");

router.get("/", (req, res) => {
  const { accountid: accountId } = req.headers;
  ArmyController.getAll({ accountId }, (err, armies) => {
    if (err) return res.status(400).send(err.message);
    else return res.status(200).send(armies);
  });
});

router.post("/create", (req, res) => {
  const { accountid: accountId } = req.headers;
  const { name } = req.body;
  if (!name) return res.status(400).send("Army name required");

  ArmyController.create({ name, accountId }, (err, newArmy) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    return res.status(201).send(newArmy);
  });
});

// specific army
router.get("/:armyId", (req, res) => {
  const { accountid: accountId } = req.headers;
  const { armyId } = req.params;
  ArmyController.getOne({ accountId, armyId }, (err, army) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    return res.status(200).send(army);
  });
});

router.delete("/remove", (req, res) => {
  const { accountid: accountId } = req.headers;
  const { armyId } = req.body;
  if (!armyId) return res.status(400).send("Army id required");

  ArmyController.validateOwner({ armyId, accountId }, (isOwner) => {
    if (!isOwner) return res.status(403).send("Army not owned by account.");

    ArmyController.delete({ armyId }, (err, armyRemoved) => {
      if (err) {
        return res.status(400).send(err.message);
      }
      return res.status(200).send({ armyId: armyRemoved._id });
    });
  });
});

module.exports = router;
