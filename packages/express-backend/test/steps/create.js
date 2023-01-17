const StepController = require("../../steps/controller");
const Army = require("../../armies/schema");
const Account = require("../../accounts/schema");
const assert = require("assert");

const ARMY_NAME = "Chaos Army";

let army;
let account;
before(() => {
  account = new Account({
    email: "email@email.com",
    password: "password",
  });
  account.save().then(() => {
    army = new Army({ name: ARMY_NAME, accountId: account._id });
    army.save().then(() => done());
  });
});
describe("Steps - Create", () => {
  describe("When a user adds a new step", () => {
    it("is added to the correct army", (done) => {
      StepController.create(
        { name: "step", armyId: army._id },
        (err, response) => {
          assert(response.step.name === "step");
          assert(response.armyId === army._id);
          done();
        }
      );
    });
  });
});
