const Step = require("../steps/schema");
const Army = require("./schema");

// _id
// accountId
// name
// steps: []
class ArmyController {
  validateOwner({ armyId, accountId }, callback) {
    Army.exists({ accountId, _id: armyId }, (err, army) => {
      if (err) callback(false);
      else callback(!!army);
    });
  }
  cleanArmy(army) {
    const { _id: id, name } = army;
    return { id, name };
  }
  getAll({ accountId }, callback) {
    Army.find({ accountId })
      .limit(20) // TODO - paginate?
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
  delete({ armyId }, callback) {
    Army.findByIdAndRemove(armyId).exec((err, army) => {
      if (err) return callback(err);

      Step.deleteMany({ armyId: army._id }).exec((err) => {
        if (err) return callback(err);
        callback(null, army);
      });
    });
  }
  // update
}

module.exports = new ArmyController();
