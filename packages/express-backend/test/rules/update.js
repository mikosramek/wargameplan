const StepController = require("../../steps/controller");
const Army = require("../../armies/schema");
const Account = require("../../accounts/schema");
const Step = require("../../steps/schema");
const assert = require("assert");

const ARMY_NAME = "Chaos Army";

let army;
let account;
let step;
let rule, rule2;
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

describe("Rules - reorder", () => {
  before((done) => {
    StepController.createRule(
      { stepId: step._id, name: "rule", text: "rule-text" },
      (_err, response) => {
        rule = response.rules[0];
        StepController.createRule(
          { stepId: step._id, name: "rule2", text: "rule-text" },
          (_err, response) => {
            rule2 = response.rules[1];
            done();
          }
        );
      }
    );
  });
  describe("When a user tries to move the first rule up once", () => {
    it("returns an error", (done) => {
      StepController.moveRule(
        {
          stepId: step._id.toString(),
          ruleId: rule.id.toString(),
          direction: -1,
        },
        (err) => {
          assert(err.message === "Reorder out of bounds");
          done();
        }
      );
    });
  });
  describe("When a user tries to move the last rule down once", () => {
    it("returns an error", (done) => {
      StepController.moveRule(
        {
          stepId: step._id.toString(),
          ruleId: rule2.id.toString(),
          direction: 1,
        },
        (err) => {
          assert(err.message === "Reorder out of bounds");
          done();
        }
      );
    });
  });
  describe("When a user moves the first rule up once", () => {
    it("returns the rules with the moved rule as the second one", (done) => {
      StepController.moveRule(
        {
          stepId: step._id.toString(),
          ruleId: rule.id.toString(),
          direction: 1,
        },
        (err, response) => {
          const secondRule = response.rules[1];
          assert(secondRule.id.toString() === rule.id.toString());
          done();
        }
      );
    });
  });
});
