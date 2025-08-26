const express = require("express");
const router = express.Router({ mergeParams: true });

// Controller
const {
  createReportAlugado,
  getReportsAlugado,
  deleteReportByFormId,
} = require("../controllers/reportAlugadoController");
const {
  createReportFinanciado,
  getReportFinanciado,
  deleteReportFinanciadoByFormId,
} = require("../controllers/reportFinanciadoController");
const {
  createReportQuitado,
  getReportQuitado,
  deleteReportQuitadoByFormId,
} = require("../controllers/reportQuitadoController");

// Middleware
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

// (ALUGADO)
// Rota criação Report
router.post("/a", authGuard, validate, createReportAlugado);

// Rota Busca de Relatórios
router.get("/a", authGuard, validate, getReportsAlugado);

// Rota Deletar Relatório
router.delete("/a", authGuard, validate, deleteReportByFormId);

// (FINANCIADO)
// Rota criação Report
router.post("/f", authGuard, validate, createReportFinanciado);

// Rota busca Report
router.get("/f", authGuard, validate, getReportFinanciado);

// Rota Deletar Relatório
router.delete("/f", authGuard, validate, deleteReportFinanciadoByFormId);

// (Quitado)
// Rota criação Report
router.post("/q", authGuard, validate, createReportQuitado);

// Rota busca Report
router.get("/q", authGuard, validate, getReportQuitado);

// Rota Deletar Relatório
router.delete("/q", authGuard, validate, deleteReportQuitadoByFormId);

module.exports = router;
