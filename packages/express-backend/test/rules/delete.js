const StepController = require("../../steps/controller");
const Army = require("../../armies/schema");
const Account = require("../../accounts/schema");
const Step = require("../../steps/schema");
const assert = require("assert");

const ARMY_NAME = "Chaos Army";

let army;
let account;
let step;
before(async () => {
  account = new Account({
    email: "email@email.com",
    password: "password",
  });
  await account.save();

  army = new Army({ name: ARMY_NAME, accountId: account._id });
  await army.save();

  step = new Step({ armyId: army._id, name: "step", order: 0 });
  await step.save();
});
describe("Rules - Delete", () => {
  let rule;
  describe("When a user deletes the only rule", () => {
    before((done) => {
      StepController.createRule(
        { stepId: step._id, name: "rule", text: "rule-text" },
        (_err, updatedSteps) => {
          rule = updatedSteps[0].rules[0];
          done();
        }
      );
    });
    it("has no rules left", (done) => {
      StepController.deleteRule(
        { stepId: step._id, ruleId: rule.id },
        (_err, updatedSteps) => {
          assert(updatedSteps[0].rules.length === 0);
          done();
        }
      );
    });
  });
  describe("When a user deletes the first of two rules", () => {
    let rule2;
    before((done) => {
      StepController.createRule(
        { stepId: step._id, name: "rule", text: "rule-text" },
        () => {
          StepController.createRule(
            { stepId: step._id, name: "rule2", text: "rule-text-2" },
            (_err, updatedSteps) => {
              rule = updatedSteps[0].rules[0];
              rule2 = updatedSteps[0].rules[1];
              done();
            }
          );
        }
      );
    });
    it("removes the first", (done) => {
      StepController.deleteRule(
        { stepId: step._id, ruleId: rule.id },
        (_err, updatedSteps) => {
          assert(updatedSteps[0].rules.length === 1);
          assert(updatedSteps[0].rules[0].id.toString() !== rule.id.toString());
          done();
        }
      );
    });
    it("properly re-orders the second rule to be the first", (done) => {
      StepController.getArmySteps({ armyId: army._id }, (err, steps) => {
        Step.findById(steps[0].id).exec((err, step) => {
          const rule = step.rules[0];
          assert(rule.order === 1);
          assert(rule._id.toString() === rule2.id.toString());
          done();
        });
      });
    });
  });
});
