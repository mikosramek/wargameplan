const Step = require("./schema");

class StepController {
  cleanStep(step) {
    // console.log({ step });
    const { _id: id, name, order, rules } = step;
    return { id, name, order, rules };
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
    // Post.aggregate([{$match: {postId: 5}}, {$project: {upvotes: {$size: '$upvotes'}}}])
    Step.findById(stepId, (err, step) => {
      if (err) callback(err);
      else {
        const newRuleCount = step.ruleCount + 1;
        const newRule = { name, text, order: newRuleCount };
        // update ruleCount
        step.ruleCount = newRuleCount;
        step.rules.push(newRule);
        step.save((err) => {
          if (err) callback(err);
          else callback(null, step);
        });
      }
    });
    // Step.updateOne({ id: stepId }, { $push: { rules:  }})
  }
}

module.exports = new StepController();
