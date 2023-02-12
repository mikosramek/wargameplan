const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, SENDGRID_VERIFIED_SENDER, FRONT_END_URL } =
  process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendVerificationEmail = ({ toEmail, code }, callback) => {
  fs.readFile(
    path.resolve(__dirname, "templates/verification.html"),
    "utf-8",
    (err, template) => {
      const html = template
        .replace(/\{url\}/gi, FRONT_END_URL)
        .replace(/\{code\}/gi, code);
      if (err) {
        console.error(err);
        return callback(err);
      } else {
        const email = {
          to: toEmail,
          from: SENDGRID_VERIFIED_SENDER,
          subject: "Verify your War Game Plan email",
          html,
        };
        sgMail
          .send(email)
          .then(() => callback())
          .catch(callback);
      }
    }
  );
};

module.exports = {
  sendVerificationEmail,
};
