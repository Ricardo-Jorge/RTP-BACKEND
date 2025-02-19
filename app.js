require("dotenv").config();

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

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
