const AccountController = require("../../accounts/controller");
const Account = require("../../accounts/schema");
const assert = require("assert");

let account;
const EMAIL = "miko@mikosramek.ca";
const PASSWORD = "password";

before(() => {
  // Creating a new Instance of Account Model
  account = new Account({
    email: EMAIL,
    password: PASSWORD,
  });
  account.save().then(() => done());
});

describe("Account - Retrieve", () => {
  describe("When a user logs in with valid details", () => {
    it("is returned", (done) => {
      AccountController.getOne(
        {
          email: EMAIL,
          password: PASSWORD,
        },
        (_error, account) => {
          assert(account.email === EMAIL);
          done();
        }
      );
    });
  });

  describe("When a user logs in with invalid details", () => {
    describe("When the email is wrong", () => {
      it("returns a generic error", (done) => {
        AccountController.getOne(
          {
            email: EMAIL + "wrong",
            password: PASSWORD,
          },
          (error, account) => {
            assert(error.message === "Email or Password incorrect");
            assert(account === null);
            done();
          }
        );
      });
    });
    describe("When the password is wrong", () => {
      it("returns a generic error", (done) => {
        AccountController.getOne(
          {
            email: EMAIL,
            password: PASSWORD + "wrong",
          },
          (error, account) => {
            assert(error.message === "Email or Password incorrect");
            assert(account === null);
            done();
          }
        );
      });
    });
  });
});
