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
  beforeEach((done) => {
    StepController.createRule(
      { stepId: step._id, name: "rule", text: "rule-text" },
      (err, updatedSteps) => {
        console.log(updatedSteps);
        rule = updatedSteps[0].rules[0];
        done();
      }
    );
  });
  describe("When a user deletes a step", () => {
    it("removes the correct step", (done) => {
      // StepController.deleteRule({ stepId: step_.id })
      console.log(rule);
      done();
    });
  });
});
