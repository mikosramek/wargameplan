const AccountController = require("../../accounts/controller");
const assert = require("assert");

describe("When an account is created", () => {
  it("returns a proper account object", (done) => {
    AccountController.create(
      { email: "miko@mikosramek.ca", password: "password" },
      (_error, { account }) => {
        assert(!account.approved);
        assert(!!account.id);
        assert(!!account.sessionId);
        done();
      }
    );
  });
});
