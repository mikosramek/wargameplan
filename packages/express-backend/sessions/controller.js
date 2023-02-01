const Session = require("./schema");

class SessionController {
  create({ accountId }, callback) {
    const now = new Date();
    const expiry = new Date();
    const newSession = new Session({
      accountId,
      dateCreated: now,
      expiresAt: expiry.setMonth(expiry.getMonth() + 1),
      revoked: false,
    });
    newSession.save((err) => {
      if (err) return callback(err);
      callback(null, newSession);
    });
  }
  revoke({ sessionId, accountId }, callback) {
    Session.findOne({ _id: sessionId, accountId }).exec((err, session) => {
      if (err) return callback(err);
      if (!session) return callback();
      session.revoked = true;
      session.save((err) => {
        if (err) return callback(err);
        callback();
      });
    });
  }
  revokeAll({ accountId }, callback) {
    Session.updateMany({ accountId }, { revoked: true })
      .then(callback)
      .catch(callback);
  }
  cleanRevoked(callback) {
    Session.deleteMany({ revoked: true }).then(callback).catch(callback);
  }
}

module.exports = new SessionController();
