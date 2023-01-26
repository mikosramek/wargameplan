const StepController = require("../../steps/controller");
const Army = require("../../armies/schema");
const Account = require("../../accounts/schema");
const Step = require("../../steps/schema");
const assert = require("assert");

const ARMY_NAME = "Chaos Army";

let army;
let account;
let step, step2;
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

  step2 = new Step({ armyId: army._id, name: "step2", order: 1 });
  await step2.save();
});

describe("Steps - reorder", () => {
  describe("When a user moves the second step up once", () => {
    it("returns the swapped positions", (done) => {
      StepController.moveStep(
        { stepId: step2._id, direction: -1, armyId: army._id },
        (err, update) => {
          const { movedStep } = update;
          assert(movedStep.order === 0);
          assert(movedStep.id.toString() === step2._id.toString());
          done();
        }
      );
    });
    it("updates the step in the db", (done) => {
      Step.findById(step2._id).exec((_err, updatedStep) => {
        const { order } = updatedStep;
        assert(order === 0);
        done();
      });
    });
  });
  describe("When a user moves the first step up once", () => {
    it("returns the swapped positions", (done) => {
      StepController.moveStep(
        { stepId: step2._id, direction: -1, armyId: army._id },
        (err, update) => {
          const { movedStep } = update;
          assert(movedStep.order === 1);
          assert(movedStep.id.toString() === step2._id.toString());
          done();
        }
      );
    });
    it("wraps around to be last", (done) => {
      Step.findById(step2._id).exec((_err, updatedStep) => {
        const { order } = updatedStep;
        assert(order === 1);
        done();
      });
    });
  });
});
