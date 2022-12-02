require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

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
  console.log("connected");
});

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/accounts", require("./accounts/routes"));
app.use("/api/v1/:accountId/armies", require("./armies/routes"));

app.listen(3000);
