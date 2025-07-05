const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_DOCKER_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: true,
  },
  test: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_DOCKER_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: true,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_DOCKER_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: true,
  },
};
