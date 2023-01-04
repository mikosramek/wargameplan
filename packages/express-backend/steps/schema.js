const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ruleSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  order: { type: Number },
  iconUrl: { type: String, required: false, default: "" },
});

/*
{
	stepName: string,
	stepId: uuid,
	rules: [uuid]
}
*/
const StepsSchema = Schema({
  armyId: { type: Schema.Types.ObjectId, ref: "Army", required: true },
  name: { type: String, required: true },
  order: { type: Number },
  ruleCount: { type: Number, default: 0 },
  rules: [ruleSchema],
});

const Step = mongoose.model("Step", StepsSchema, "steps");

module.exports = Step;
