const Army = require("./schema");

// _id
// accountId
// name
// steps: []
class ArmyController {
  cleanArmy(army) {
    const { _id: id, name, steps } = army;
    return { id, name, steps };
  }
  getAll({ accountId }, callback) {
    Army.find({ accountId })
      .limit(20)
      .exec((err, armies) => {
        if (err) callback(err);
        else callback(null, armies.map(this.cleanArmy));
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
      else callback(null, this.cleanArmy(army));
    });
  }
  // delete
  // update
}

module.exports = new ArmyController();
