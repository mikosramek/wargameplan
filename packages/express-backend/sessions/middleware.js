const SessionController = require("./controller");

const middleware = function (req, res, next) {
  const { accountid, sessionid } = req.headers;
  SessionController.verify(
    { accountId: accountid, sessionId: sessionid },
    (err) => {
      if (err) return res.status(403).send(err.message);
      else next();
    }
  );
};

module.exports = middleware;
