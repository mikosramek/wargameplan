const Account = require("./schema");
const { compareHash } = require("../utils/hash");
const Session = require("../sessions/schema");
const SessionController = require("../sessions/controller");

class AccountController {
  create(account, callback) {
    const newAccount = new Account(account);
    newAccount.save((err) => {
      if (err) callback(err);
      else {
        const { _id: id, approved, email } = newAccount;
        SessionController.create({ accountId: id }, (err, newSession) => {
          if (err) return callback(err);
          const { _id: sessionId } = newSession;
          callback(null, {
            account: {
              id,
              sessionId,
              approved,
            },
            expired: false,
          });
        });
      }
    });
  }
  delete(id, callback) {
    Account.findByIdAndRemove(id).exec((err, account) => {
      if (err) return callback(err);
      callback(null, account);
    });
  }
  loginViaSession({ sessionId }, callback) {
    Session.findById(sessionId).exec((err, session) => {
      if (err) return callback(err);
      if (!session) {
        return callback(new Error("Session not found"), null);
      }

      const { accountId, expiresAt, revoked } = session;

      const now = new Date();
      const expires = new Date(expiresAt);
      if (revoked || now > expires) {
        return callback(null, { account: null, expired: true });
      }

      Account.findById(accountId).exec((accErr, account) => {
        if (err) return callback(accErr);
        if (!account) {
          return callback(
            new Error("No account associated with session"),
            null
          );
        }

        const { approved } = account;
        callback(null, {
          account: {
            id: accountId,
            sessionId,
            approved,
          },
          expired: false,
        });
      });
    });
  }
  // TODO: update
  getOne({ email, password }, callback) {
    Account.findOne({ email }).exec((err, account) => {
      if (err) return callback(err);
      if (!account) {
        return callback(new Error("Email or Password incorrect"), null);
      }

      const { _id: id, approved, password: accountPassword } = account; // TODO: new session

      compareHash(password, accountPassword)
        .then((passwordMatches) => {
          if (!passwordMatches) {
            return callback(new Error("Email or Password incorrect"), null);
          }
          SessionController.create({ accountId: id }, (err, newSession) => {
            if (err) return callback(err);
            const { _id: sessionId } = newSession;
            callback(null, {
              account: {
                id,
                sessionId,
                approved,
              },
              expired: false,
            });
          });
        })
        .catch((error) => callback(error));
    });
  }
}

module.exports = new AccountController();
