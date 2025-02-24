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
const {
  createReportFinanciado,
  getReportFinanciado,
} = require("../controllers/reportFinanciadoController");

// Rotas (ALUGADO)
// Rota criação Report
router.post("/a", authGuard, validate, createReportAlugado);

// Rota Busca de Relatórios
router.get("/a", authGuard, validate, getReportsAlugado);

// Rotas (FINANCIADO)
// Rota criação Report
router.post("/f", authGuard, validate, createReportFinanciado);

// Rota busca Report
router.get("/f", authGuard, validate, getReportFinanciado);

module.exports = router;
