import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Middleware } from "./middleware";
import FirebaseRoutes from "./routes/firebase";
import OpenAiRoutes from "./routes/openai";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT as string;
const middleware: Middleware = new Middleware();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.HOST_URL }));

app.use(middleware.decodeToken);

// openai routes
app.use("/openai", OpenAiRoutes);

// firebase routes
app.use("/firebase", FirebaseRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
