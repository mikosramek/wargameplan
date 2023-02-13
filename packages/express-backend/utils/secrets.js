const { WEBHOOK_SECRET } = process.env;

let crypto;
try {
  crypto = require("node:crypto");
} catch (err) {
  console.error("crypto support is disabled!");
}

const validateRequestSecret = (request) => {
  const expectedSignature =
    "sha1=" +
    crypto
      .createHmac("sha1", WEBHOOK_SECRET)
      .update(JSON.stringify(request.body))
      .digest("hex");
  const signature = request.headers["x-hub-signature"];
  console.log({ expectedSignature, signature });
  if (signature !== expectedSignature) {
    throw new Error("Invalid signature.");
  }
};

module.exports = { validateRequestSecret };
