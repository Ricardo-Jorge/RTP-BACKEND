const express = require("express");
const router = express.Router();

// Controller
const {
  createFormAlugado,
  getFormsAlugado,
  updateForm,
  deleteFormAlugado,
} = require("../controllers/formAlugadoController");

const {
  createFormFinanciado,
  getFormsFinanciado,
  updateFormFinanciado,
  deleteFormFinanciado,
} = require("../controllers/formFinanciadoController");

// Middleware
const formAlugadoValidate = require("../middlewares/FormAlugadoValidation");
const formFinanciadoValidate = require("../middlewares/FormFinanciadoValidation");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const FormFinanciadoValidate = require("../middlewares/FormFinanciadoValidation");

// Rotas (Financiado)
// Rota para Ciar Form
router.post(
  "/financiado",
  authGuard,
  formFinanciadoValidate(),
  validate,
  createFormFinanciado
);

// Rota para buscar Forms de User Loggado
router.get("/financiado", authGuard, validate, getFormsFinanciado);

// Rota para Update Forms
router.put(
  "/financiado/:id",
  authGuard,
  FormFinanciadoValidate(),
  validate,
  updateFormFinanciado
);

// Rota Delete Form
router.delete("/financiado/:id", authGuard, validate, deleteFormFinanciado);

// Rotas (alugado)
// Rota para criar Form
router.post(
  "/alugado",
  authGuard,
  formAlugadoValidate(),
  validate,
  createFormAlugado
);

// Rota para buscar Forms de User Loggado
router.get("/alugado", authGuard, validate, getFormsAlugado);

// Rota para Update Forms
router.put(
  "/alugado/:id",
  authGuard,
  formAlugadoValidate(),
  validate,
  updateForm
);

// Rota para deletar um formulário (usando parâmetro :id)
router.delete("/alugado/:id", authGuard, validate, deleteFormAlugado);

// Monta as rotas de relatórios aninhadas
router.use("/alugado/:id/report", require("./ReportRoutes"));

module.exports = router;
