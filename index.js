const express = require("express");
const cors = require("cors");
const { CONSTANT_VARIABLES } = require("./config/config");
const route = require("./routes/Routes");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", route);
require("./database/connection");
const startServer = () => {
  app.listen(CONSTANT_VARIABLES.PORT, () => {
    console.log("server is up and running..!!");
  });
};

startServer();

module.exports = app;
