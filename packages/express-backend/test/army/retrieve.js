const ArmyController = require("../../armies/controller");
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
describe("Army - Retrieve", () => {
  describe("When a user fetches an army", () => {
    it("returns the proper army", (done) => {
      ArmyController.getOne(
        { accountId: account._id, armyId: army._id },
        (err, army) => {
          assert(army.name === ARMY_NAME);
          done();
        }
      );
    });
  });
});
