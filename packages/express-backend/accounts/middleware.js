const AccountController = require("./controller");

const middleware = function (req, res, next) {
  const { accountid } = req.headers;
  AccountController.verifyAccountApproval({ accountId: accountid }, (err) => {
    if (err) return res.status(403).send(err.message);
    else next();
  });
};

module.exports = middleware;
