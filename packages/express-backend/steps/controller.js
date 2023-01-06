const Step = require("./schema");
const ArmyController = require("../armies/controller");

orderSort = (a, b) => {
  if (a.order > b.order) return 1;
  else if (a.order < b.order) return -1;
  return 0;
};
cleanRules = (rules) => {
  return rules.sort(orderSort).map(({ _id, name, text, iconUrl }) => ({
    id: _id,
    name,
    text,
    iconUrl,
  }));
};
class StepController {
  cleanStep(step) {
    const { _id: id, name, order, rules } = step;
    return { id, name, order, rules: cleanRules(rules) };
  }
  getArmySteps({ armyId }, callback) {
    Step.find({ armyId }).exec((err, steps) => {
      if (err) callback(err);
      else callback(null, steps.map(this.cleanStep));
    });
  }
  create({ name, armyId }, callback) {
    Step.count({ armyId }, (err, count) => {
      if (err) callback(err);
      else {
        const newStep = new Step({ name, armyId, order: count });
        newStep.save((err) => {
          if (err) callback(err);
          else callback(null, newStep);
        });
      }
    });
  }
  createRule({ stepId, name, text }, callback) {
    Step.findById(stepId, (err, step) => {
      if (err) callback(err);
      else {
        const newRuleCount = step.ruleCount + 1;
        const newRule = { name, text, order: newRuleCount };

        step.ruleCount = newRuleCount;
        step.rules.push(newRule);
        step.save((err) => {
          if (err) callback(err);
          else {
            this.getArmySteps({ armyId: step.armyId }, (err, armySteps) => {
              if (err) callback(err);
              else callback(null, armySteps);
            });
          }
        });
      }
    });
  }
}

module.exports = new StepController();
