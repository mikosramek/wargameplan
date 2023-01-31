const AccountController = require("../../accounts/controller");
const assert = require("assert");

describe("When an account is created", () => {
  it("returns the correct response", (done) => {
    AccountController.create(
      { email: "miko@mikosramek.ca", password: "password" },
      (_error, account) => {
        assert(!account.approved);
        assert(account.email === "miko@mikosramek.ca");
        done();
      }
    );
  });
});
