const express = require("express");
const cors = require("cors");
const middleware = require("./middleware/index");
const env = require("dotenv").config();

const app = express();
const port = process.env.PORT;
const isProd = process.env.NODE_ENV_CURRENT === "PROD";

app.use(cors(isProd && { origin: process.env.HOST_URL }));

app.use(middleware.decodeToken);

app.get("/app", (req, res) => {
  res.status(200).json({ success: "true" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
