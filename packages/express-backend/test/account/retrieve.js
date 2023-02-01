const AccountController = require("../../accounts/controller");
const Account = require("../../accounts/schema");
const assert = require("assert");
const SessionController = require("../../sessions/controller");
const Session = require("../../sessions/schema");

let account;
let sessionId;
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
  describe("When a user logs in with valid email and password", () => {
    it("returns a proper account", (done) => {
      AccountController.getOne(
        {
          email: EMAIL,
          password: PASSWORD,
        },
        (_error, response) => {
          sessionId = response.account.sessionId;
          assert(!!response);
          assert(response.account.id.toString() === account._id.toString());
          done();
        }
      );
    });
    it("returns with a valid session id", (done) => {
      Session.findById(sessionId).exec((err, session) => {
        const { revoked, expiresAt } = session;
        assert(!revoked);
        assert(new Date(expiresAt) > new Date());
        done();
      });
    });
    describe("When a user logs in with returned sessionId", () => {
      it("returns a proper account", (done) => {
        AccountController.loginViaSession({ sessionId }, (err, response) => {
          assert(!!response);
          assert(response.account.id.toString() === account._id.toString());
          done();
        });
      });
    });
  });

  describe("When a user logs in with invalid email and password", () => {
    describe("When the email is wrong", () => {
      it("returns a generic error", (done) => {
        AccountController.getOne(
          {
            email: EMAIL + "wrong",
            password: PASSWORD,
          },
          (error, response) => {
            assert(error.message === "Email or Password incorrect");
            assert(response === null);
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
          (error, response) => {
            assert(error.message === "Email or Password incorrect");
            assert(response === null);
            done();
          }
        );
      });
    });
    before((done) => {
      SessionController.revoke({ sessionId, accountId: account._id }, () => {
        done();
      });
    });
    describe("When the session id is revoked", () => {
      it("returns as expired without an account", (done) => {
        AccountController.loginViaSession(
          { sessionId },
          (err, { account, expired }) => {
            assert(!account);
            assert(expired);
            done();
          }
        );
      });
    });
    describe("When the session id is invalid", () => {
      it("returns an error", (done) => {
        AccountController.loginViaSession(
          { sessionId: "123456789123" },
          (err) => {
            assert(!!err);
            done();
          }
        );
      });
    });
  });
});
