const express = require("express");
const cors = require("cors");
const middleware = require("./middleware/index");
const env = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;
const openAiRoutes = require("./routes/openai");
const firebaseRoutes = require("./routes/firebase");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: process.env.HOST_URL }));

app.use(middleware.decodeToken);

// openai routes
app.use("/openai", openAiRoutes);

// firebase routes
app.use("/firebase", firebaseRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
