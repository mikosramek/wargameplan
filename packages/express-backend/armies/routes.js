const express = require("express");
const router = express.Router({ mergeParams: true });
const ArmyController = require("./controller");

router.get("/", (req, res) => {
  const { accountId } = req.params;
  ArmyController.getAll({ accountId }, (err, armies) => {
    if (err) return res.status(400).send(err.message);
    else return res.status(200).send(armies);
  });
});

router.post("/create", (req, res) => {
  const { accountId } = req.params;
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
  const { accountId, armyId } = req.params;
  ArmyController.getOne({ accountId, armyId }, (err, army) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    return res.status(200).send(army);
  });
});

module.exports = router;
