const ArmyController = require("../../armies/controller");
const StepController = require("../../steps/controller");
const Account = require("../../accounts/schema");
const assert = require("assert");

const ARMY_NAME = "Chaos Army";

let account;
before(() => {
  account = new Account({
    email: "email@email.com",
    password: "password",
  });
  account.save().then(() => done());
});
describe("Army - Create", () => {
  describe("When a user creates a new army", () => {
    let army;
    it("is created", (done) => {
      ArmyController.create(
        { name: ARMY_NAME, accountId: account._id },
        (err, createdArmy) => {
          army = createdArmy;
          assert(createdArmy.name === ARMY_NAME);
          done();
        }
      );
    });
    it("is owned by the proper account", (done) => {
      ArmyController.validateOwner(
        { armyId: army._id, accountId: account._id },
        (isOwner) => {
          assert(isOwner);
          done();
        }
      );
    });
    it("is not owned by a different account", (done) => {
      ArmyController.validateOwner(
        { armyId: army._id, accountId: "123" },
        (isOwner) => {
          assert(!isOwner);
          done();
        }
      );
    });
  });
});
