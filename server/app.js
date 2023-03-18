const express = require("express");
const cors = require("cors");
const middleware = require("./middleware/index");
const env = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;
const openAiRoutes = require("./routes/openai");
const isDev = process.env.CURRENT_ENV === "dev";
const cookieInfoDev = { httpOnly: true, sameSite: "lax" };
const cookieInfo = { httpOnly: true, sameSite: "none", secure: true };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: process.env.HOST_URL, credentials: true }));

// set cookie
app.post(
  "/setcookie",
  (req, res, next) => middleware.decodeToken(req, res, next, true),
  (req, res) => {
    res.cookie("secret", req.headers?.authorization, isDev ? cookieInfoDev : cookieInfo);
    res.status(201).json({ status: "ok" });
  }
);

app.use((req, res, next) => middleware.decodeToken(req, res, next, false));

// openai routes
app.use("/openai", openAiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
