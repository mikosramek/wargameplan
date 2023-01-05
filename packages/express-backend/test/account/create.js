const AccountController = require("../../accounts/controller");
const assert = require("assert");

describe("When an account is created", () => {
  it("exists", (done) => {
    AccountController.create(
      { email: "miko@mikosramek.ca", password: "password" },
      (_error, account) => {
        assert(!account.isNew);
        done();
      }
    );
  });
});
