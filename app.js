require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerJson = require("./collection.json");
const swaggerUi = require("swagger-ui-express");
const postmanToOpenApi = require("postman-to-openapi");

const express = require("express");
const cors = require("cors");

const port = process.env.PORT_DOCKER;
const frontPort = process.env.FRONT_PORT;

const app = express();

// config JSON
app.use(express.json());

// Solve CORS
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${frontPort}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// DB Connection
require("./models/index");

// routes
const router = require("./routes/Router");

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.get("/swagger-json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});

app.get("/generate-yml", async (req, res) => {
  const postmanCollection = "collection.json";

  const outputFile = "collection.yml";

  try {
    const result = await postmanToOpenApi(postmanCollection, outputFile, {
      defaultTag: "General",
    });

    const result2 = await postmanToOpenApi(postmanCollection, null, {
      defaultTag: "General",
    });
    console.log(`OpenAPI specs: ${result}`);
  } catch (err) {
    console.log(err);
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
