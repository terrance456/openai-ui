import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerUiDocs from "./swagger.json";

const setupSwaggerDocs = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerUiDocs));

  app.get("/download/swagger.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerUiDocs);
  });
};

export default setupSwaggerDocs;
