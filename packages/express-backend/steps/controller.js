const mongoose = require("mongoose");
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

  moveStep({ stepId, direction, armyId }, callback) {
    // find all steps for this army + sort by order
    // find index of step that matches stepId
    // based on direction, update order # for step + step in direction
    Step.find({ armyId }).exec((err, steps) => {
      if (err) callback(err);

      steps.sort(orderSort);
      const stepIndex = steps.findIndex(({ _id }) => _id.toString() === stepId);

      if (stepIndex < 0) return callback(new Error("Step not found on army"));

      const stepToUpdate = steps[stepIndex];
      let otherStepIndex;

      if (direction === -1) {
        if (stepIndex === 0) {
          otherStepIndex = steps.length - 1;
        } else {
          otherStepIndex = stepIndex - 1;
        }
      } else if (direction === 1) {
        if (stepIndex === steps.length - 1) {
          otherStepIndex = 0;
        } else {
          otherStepIndex = stepIndex + 1;
        }
      }
      const otherStep = steps[otherStepIndex];
      const stepOrder = stepToUpdate.order;

      stepToUpdate.order = otherStep.order;
      otherStep.order = stepOrder;

      let session;
      mongoose
        .startSession()
        .then((_session) => {
          session = _session;
          session.startTransaction();
        })
        .then(() => {
          stepToUpdate.save();
          otherStep.save();
        })
        .then(() => {
          session.endSession();
          callback(null, {
            armyId,
            movedStep: {
              id: stepToUpdate._id,
              order: stepToUpdate.order,
            },
            shiftedStep: {
              id: otherStep._id,
              order: otherStep.order,
            },
          });
        })
        .catch(console.error);
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
