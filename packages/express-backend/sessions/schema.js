const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  dateCreated: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
});

const Session = mongoose.model("Session", SessionSchema, "sessions");

module.exports = Session;
