const { v4: uuidv4 } = require("uuid");
const Account = require("./schema");
const { compareHash } = require("../utils/hash");
const Session = require("../sessions/schema");
const SessionController = require("../sessions/controller");
const { sendVerificationEmail } = require("../utils/email/sendgrid");

class AccountController {
  create(account, callback) {
    const newAccount = new Account(account);
    newAccount.save((err) => {
      if (err) callback(err);
      else {
        const { _id: id, approved } = newAccount;
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
  verifyAccountApproval({ accountId }, callback) {
    Account.findById(accountId).exec((err, account) => {
      if (err) return callback(err);
      if (!account || !account.approved) {
        return callback(new Error("Account not verified"));
      }
      callback();
    });
  }
  sendVerificationEmail({ accountId }, callback) {
    Account.findById(accountId).exec((err, account) => {
      if (err) return callback(err);
      if (!account) return callback(new Error("No account found"));

      const { approved, email } = account;

      if (approved) return callback(new Error("Account already verified"));

      // create new code on account object
      account.verificationId = uuidv4();
      account.verificationDateCreated = new Date();

      account.save((err) => {
        if (err) return callback(err);
        // send email to user's email
        sendVerificationEmail(
          { toEmail: email, code: account.verificationId },
          (err) => {
            if (err) {
              console.error(err);
              return callback(err);
            }
            callback();
          }
        );
      });
    });
  }
  verifyAccountViaCode({ accountId, code }, callback) {
    Account.findById(accountId).exec((err, account) => {
      if (err) return callback(err);
      if (!account) return callback(new Error("No account found"));

      const { verificationId, verificationDateCreated } = account;

      if (!verificationId)
        return callback(new Error("No verification id found on account"));
      const now = new Date();
      const expiry = new Date(verificationDateCreated);
      expiry.setTime(expiry.getTime() + 600000);
      if (now > expiry) return callback(new Error("Verification code expired"));

      if (code === verificationId) {
        account.approved = true;
        account.save((err) => {
          if (err) return callback(err);
          callback();
        });
      } else {
        return callback(new Error("Verifcation code invalid"));
      }
    });
  }
}

module.exports = new AccountController();
