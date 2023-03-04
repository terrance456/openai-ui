const express = require("express");
const cors = require("cors");
const middleware = require("./middleware/index");
const env = require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());

app.use(middleware.decodeToken);

app.get("/app", (req, res) => {
  res.status(200).json({ success: "true" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
