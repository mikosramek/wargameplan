require("dotenv").config();
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const https = require("https");

const IS_DEV = process.env.NODE_ENV === "dev";

const { DB_NAME, DB_USER, DB_PASSWORD, FRONT_END_URL } = process.env;

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

// https://api.wargameplanner.com:1337/api/v1/webhooks/release
// https://wgp-be.ngrok.io/api/v1/webhooks/release

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/webhooks", require("./webhooks/routes"));

const whitelist = [FRONT_END_URL];
app.use(
  cors(
    IS_DEV
      ? {}
      : {
          origin: (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) {
              callback(null, true);
            } else {
              callback(new Error("Not allowed by CORS"));
            }
          },
        }
  )
);

app.use("/api/v1/accounts", require("./accounts/routes"));
app.use("/api/v1/features", require("./features/routes/global"));
app.use(require("./sessions/middleware"));
app.use(require("./accounts/middleware"));
app.use("/api/v1/armies", require("./armies/routes"));
app.use("/api/v1/steps", require("./steps/routes"));
app.use("/api/v1/rules", require("./steps/rulesRoutes"));

if (IS_DEV) {
  const server = http.createServer(app);
  server.listen(1337, () => {
    console.log("HTTP Server running on port 1337");
  });
} else {
  // Certificate
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/api.wargameplanner.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/api.wargameplanner.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/api.wargameplanner.com/chain.pem",
    "utf8"
  );

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(1337, () => {
    console.log("HTTPS Server running on port 1337");
  });
}
