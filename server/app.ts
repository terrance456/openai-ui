import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Middleware } from "./middleware";
import FirebaseRoutes from "./routes/firebase";
import OpenAiRoutes from "./routes/openai";
import StripeWebhookRoutes from "./routes/stripe/webhook";
import StripeRoutes from "./routes/stripe";
import setupSwaggerDocs from "./docs/swagger/setupSwagger";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT as string;
const middleware: Middleware = new Middleware();

app.use(cors({ origin: process.env.HOST_URL }));

// stripe payment events route
app.use("/signature", StripeWebhookRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// swagger docs
setupSwaggerDocs(app);

app.use(middleware.decodeToken);

// openai routes
app.use("/openai", OpenAiRoutes);

// firebase routes
app.use("/firebase", FirebaseRoutes);

// stripe payment link
app.use("/stripe", StripeRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
