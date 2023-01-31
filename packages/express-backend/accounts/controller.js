const Account = require("./schema");
const { compareHash } = require("../utils/hash");

class AccountController {
  create(account, callback) {
    const newAccount = new Account(account);
    newAccount.save((err) => {
      if (err) callback(err);
      else {
        const { _id: id, approved, email } = newAccount;
        callback(null, { id, approved, email });
      }
    });
  }
  delete(id, callback) {
    Account.findByIdAndRemove(id).exec((err, account) => {
      if (err) return callback(err);
      callback(null, account);
    });
  }
  // update
  getOne({ email, password }, callback) {
    Account.findOne({ email }).exec((err, account) => {
      if (err) return callback(err);
      if (!account) {
        return callback(new Error("Email or Password incorrect"), null);
      }

      const { _id: id, approved, password: accountPassword } = account; // TODO: new session

      compareHash(password, accountPassword)
        .then((passwordMatches) => {
          if (passwordMatches) {
            callback(null, { id, email, approved });
          } else {
            callback(new Error("Email or Password incorrect"), null);
          }
        })
        .catch((error) => callback(error));
    });
  }
}

module.exports = new AccountController();
