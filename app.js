require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const postmanToOpenApi = require("postman-to-openapi");

const swaggerJson = require("./openapi.json");
const express = require("express");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// config JSON
app.use(express.json());

// Solve CORS
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:5000`,
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
  console.log(`App rodando na porta ${port}`);
});
