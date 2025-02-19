const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const {
  createReportAlugado,
  getReportsAlugado,
} = require("../controllers/reportAlugadoController");

// Middleware
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

// Rota criação Report
router.post("/", authGuard, validate, createReportAlugado);

// Rota Busca de Relatórios
router.get("/", authGuard, validate, getReportsAlugado);

module.exports = router;
