const Step = require("./schema");

orderSort = (a, b) => {
  if (a.order > b.order) return 1;
  else if (a.order < b.order) return -1;
  return 0;
};
cleanAndSortRules = (rules) => {
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
    return { id, name, order, rules: cleanAndSortRules(rules) };
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
          else
            callback(null, {
              armyId: newStep.armyId,
              step: this.cleanStep(newStep),
            });
        });
      }
    });
  }
  deleteStep({ stepId }, callback) {
    Step.findByIdAndRemove(stepId).exec((err, step) => {
      if (err) return callback(err);
      callback(null, step);
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
            callback(null, {
              stepId: step._id,
              rules: cleanAndSortRules(step.rules),
            });
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
        if (ruleIndex === -1)
          return callback(new Error("No rule found on provided step"));
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
            callback(null, {
              stepId: step._id,
              rules: cleanAndSortRules(step.rules),
            });
          }
        });
      }
    });
  }
}

module.exports = new StepController();
