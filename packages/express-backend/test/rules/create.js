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
describe("Rules - Create", () => {
  describe("When a user adds a new rule to a step", () => {
    it("returns steps with the proper rule added", (done) => {
      StepController.createRule(
        { stepId: step._id, name: "rule", text: "rule-text" },
        (_err, updatedSteps) => {
          const rules = updatedSteps[0].rules;
          assert(!!rules && rules.length === 1);
          done();
        }
      );
    });
    describe("When there's already a rule in a step", () => {
      it("updates the ruleCount property correctly", (done) => {
        StepController.createRule(
          { stepId: step._id, name: "rule", text: "rule-text" },
          (_err, _updatedSteps) => {
            Step.findById(step._id).exec((_err, step) => {
              assert(step.ruleCount === 2);
              done();
            });
          }
        );
      });
    });
  });
});
