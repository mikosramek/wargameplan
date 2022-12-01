const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArmySchema = Schema({
  accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  name: { type: String, required: true },
  Steps: [{ type: Schema.Types.ObjectId, ref: "Step", default: [] }],
});

const Army = mongoose.model("Army", ArmySchema, "armies");

module.exports = Army;
