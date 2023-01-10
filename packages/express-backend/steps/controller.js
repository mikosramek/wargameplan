const Step = require("./schema");

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
          else this.getArmySteps({ armyId: newStep.armyId }, callback);
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
            this.getArmySteps({ armyId: step.armyId }, callback);
          }
        });
      }
    });
  }
  deleteRule({ stepId, ruleId }, callback) {
    Step.findById(stepId, (err, step) => {
      if (err) callback(err);
      else {
        const rules = [...step.rules];
        // remove rule via ID?
        const ruleIndex = rules.findIndex(
          (rule) => rule._id.toString() === ruleId.toString()
        );
        rules.splice(ruleIndex, 1);
        // update ruleCount
        step.ruleCount = rules.length;

        // update rules ordering
        for (let i = 0; i < rules.length; i += 1) {
          if (rules[i].order > ruleIndex) {
            rules[i].order -= 1;
          }
        }

        step.rules = rules;
        // save step
        step.save((err) => {
          if (err) callback(err);
          else {
            // return this.getArmySteps
            this.getArmySteps({ armyId: step.armyId }, callback);
          }
        });
      }
    });
  }
}

module.exports = new StepController();
