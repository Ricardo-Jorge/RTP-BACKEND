const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const {
  createReportAlugado,
  getReportsAlugado,
} = require("../controllers/reportAlugadoController");
const {
  createReportFinanciado,
  getReportFinanciado,
} = require("../controllers/reportFinanciadoController");
const {
  createReportQuitado,
  getReportQuitado,
} = require("../controllers/reportQuitadoController");

// Middleware
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

// (ALUGADO)
// Rota criação Report
router.post("/a", authGuard, validate, createReportAlugado);

// Rota Busca de Relatórios
router.get("/a", authGuard, validate, getReportsAlugado);

// (FINANCIADO)
// Rota criação Report
router.post("/f", authGuard, validate, createReportFinanciado);

// Rota busca Report
router.get("/f", authGuard, validate, getReportFinanciado);

// (Quitado)
// Rota criação Report
router.post("/q", authGuard, validate, createReportQuitado);

// Rota busca Report
router.get("/q", authGuard, validate, getReportQuitado);

module.exports = router;
