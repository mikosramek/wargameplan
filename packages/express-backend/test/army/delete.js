const assert = require("assert");
const Account = require("../../accounts/schema");
const Army = require("../../armies/schema");
const Step = require("../../steps/schema");
const ArmyController = require("../../armies/controller");

const ARMY_NAME = "Chaos Army";

let army;
let account;
const steps = [];
const stepCount = 3;

before(async () => {
  account = new Account({
    email: "email@email.com",
    password: "password",
  });
  await account.save();
  army = new Army({ name: ARMY_NAME, accountId: account._id });
  await army.save();
});
describe("Army - Delete", () => {
  describe("When a user deletes an army", () => {
    it("returns the correct id", (done) => {
      ArmyController.delete({ armyId: army._id }, (err, removedArmy) => {
        assert(removedArmy._id.toString() === army._id.toString());
        done();
      });
    });
    it("no longer exists in the db", (done) => {
      Army.findById(army._id).exec((err, armyFound) => {
        assert(armyFound === null);
        done();
      });
    });
  });
  describe("When a user deletes an army with steps", () => {
    before(async () => {
      army = new Army({ name: ARMY_NAME, accountId: account._id });
      await army.save();
      for (let i = 0; i < stepCount; i += 1) {
        const newStep = new Step({
          armyId: army._id,
          name: `step-${i}`,
          order: i,
        });
        await newStep.save();
        steps.push(newStep);
      }
    });
    it("removes the associated steps", (done) => {
      ArmyController.delete({ armyId: army._id }, () => {
        Step.find({ armyId: army._id }).exec((err, foundSteps) => {
          assert(foundSteps.length === 0);
          done();
        });
      });
    });
  });
});
