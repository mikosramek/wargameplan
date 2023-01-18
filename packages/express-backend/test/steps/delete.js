const assert = require("assert");
const StepController = require("../../steps/controller");
const Army = require("../../armies/schema");
const Account = require("../../accounts/schema");
const Step = require("../../steps/schema");

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
describe("Steps - Delete", () => {
  describe("When a user deletes a step", () => {
    it("removes the correct step", (done) => {
      StepController.deleteStep({ stepId: step._id }, (_err, removedStep) => {
        assert(removedStep._id.toString() === step._id.toString());
        done();
      });
    });
    it("no longer exists on the army", (done) => {
      Step.find({ armyId: army._id }, (_err, steps) => {
        assert(steps.length === 0);
        done();
      });
    });
  });
});
