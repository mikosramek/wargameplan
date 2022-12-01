const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const { createHash } = require("../utils/hash");

const Schema = mongoose.Schema;

const accountSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: "This email is already in use ({VALUE})",
    dropDups: true,
  },
  password: { type: String, required: true },
  validSessions: { type: Array },
  approved: { type: Boolean, default: false },
});

accountSchema.plugin(beautifyUnique);

accountSchema.pre("save", function (next) {
  const account = this;
  if (account.isModified("password") || account.isNew) {
    createHash(account.password)
      .then((hashedPassword) => {
        account.password = hashedPassword;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;
