require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { DB_NAME, DB_USER, DB_PASSWORD, FRONT_END_URL, DEV_FRONT_END_URL } =
  process.env;

const dbConnection = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@prod.8tbszom.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (e) => {
  console.error(e);
});

db.on("open", () => {
  console.log("connected to database");
});

const app = express();

const whitelist = [FRONT_END_URL, DEV_FRONT_END_URL];
app.use(
  cors()
  //   {
  //   origin: (origin, callback) => {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  // }
);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get(
  ".well-known/acme-challenge/juepGiP8vqYvWiLk4WVT1tTqg3EiZ8GHWYYIsOpLKvA",
  (req, res) => {
    res
      .status(200)
      .send(
        "juepGiP8vqYvWiLk4WVT1tTqg3EiZ8GHWYYIsOpLKvA.L8hOzbQBwnMUT6BqD8rvjfuRPc5j9c09WovBAG4KW5A"
      );
  }
);

app.use("/api/v1/accounts", require("./accounts/routes"));
app.use("/api/v1/features", require("./features/routes/global"));
app.use(require("./sessions/middleware"));
app.use(require("./accounts/middleware"));
app.use("/api/v1/armies", require("./armies/routes"));
app.use("/api/v1/steps", require("./steps/routes"));
app.use("/api/v1/rules", require("./steps/rulesRoutes"));

app.listen(1337);
