const AccountController = require("../../accounts/controller");
const Account = require("../../accounts/schema");
const assert = require("assert");

let account;
const EMAIL = "miko@mikosramek.ca";

beforeEach(() => {
  // Creating a new Instance of Account Model
  account = new Account({
    email: EMAIL,
    password: "password",
  });
  account.save().then(() => done());
});

describe("When a user logs in", () => {
  it("Returns the proper account data", (done) => {
    AccountController.getOne(
      {
        email: EMAIL,
        password: "password",
      },
      (_error, account) => {
        assert(account.email === EMAIL);
        done();
      }
    );
  });
});
