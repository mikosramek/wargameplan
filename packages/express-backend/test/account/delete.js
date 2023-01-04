const AccountController = require("../../accounts/controller");
const Account = require("../../accounts/schema");
const assert = require("assert");

const EMAIL = "miko@mikosramek.ca";

describe("A user deletes their account", () => {
  let account;
  beforeEach(() => {
    account = new Account({
      email: EMAIL,
      password: "password",
    });
    account.save().then(() => done());
  });
  it("their account is removed", (done) => {
    AccountController.delete(account._id, (_error, account) => {
      assert(account === null);
      done();
    });
  });
});
