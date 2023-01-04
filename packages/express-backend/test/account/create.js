//import the User model

// const User = require("../schema/user");
// const assert = require("assert");
// describe("Creating documents in MongoDB", () => {
//   it("Creates a New User", (done) => {
//     const newUser = new User({ name: "Shriyam" });
//     newUser
//       .save() // returns a promise after some time
//       .then(() => {
//         //if the newUser is saved in db and it is not new
//         assert(!newUser.isNew);
//         done();
//       });
//   });
// });

const AccountController = require("../../accounts/controller");
const assert = require("assert");

describe("When an account is created", () => {
  it("Creates a new account", (done) => {
    AccountController.create(
      { email: "miko@mikosramek.ca", password: "password" },
      (_error, account) => {
        assert(!account.isNew);
        done();
      }
    );
  });
});
