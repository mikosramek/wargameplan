const Army = require("./schema");

class ArmyController {
  getAll({ accountId }, callback) {
    Army.find({ accountId })
      .limit(20)
      .exec((err, armies) => {
        if (err) callback(err);
        else callback(null, armies);
      });
  }
  create(armyConfig, callback) {
    const newArmy = new Army(armyConfig);
    newArmy.save((err) => {
      if (err) callback(err);
      else callback(null, newArmy);
    });
  }
  getOne(query, callback) {
    Army.findOne(query).exec((err, army) => {
      if (err) callback(err);
      else callback(null, army);
    });
  }
  // delete
  // update
}

module.exports = new ArmyController();
