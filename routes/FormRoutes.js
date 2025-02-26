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

const {
  createFormQuitado,
  getFormsQuitado,
  updateFormQuitado,
  deleteFormQuitado,
} = require("../controllers/formQuitadoController");

// Middleware
const formAlugadoValidate = require("../middlewares/FormAlugadoValidation");
const formFinanciadoValidate = require("../middlewares/FormFinanciadoValidation");
const formQuitadoValidate = require("../middlewares/formQuitadoValidation");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

// (Quitado)
// Rota para Criar Form
router.post(
  "/quitado",
  authGuard,
  formQuitadoValidate(),
  validate,
  createFormQuitado
);

// Rota Busca Forms de User Loggado
router.get("/quitado", authGuard, validate, getFormsQuitado);

// Rota Update Form
router.put(
  "/quitado/:id",
  authGuard,
  formQuitadoValidate(),
  validate,
  updateFormQuitado
);

// Rota Delete Form
router.delete("/quitado/:id", authGuard, validate, deleteFormQuitado);

// (FINANCIADO)
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
  formFinanciadoValidate(),
  validate,
  updateFormFinanciado
);

// Rota Delete Form
router.delete("/financiado/:id", authGuard, validate, deleteFormFinanciado);

// (ALUGADO)
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
router.use("/financiado/:id/report", require("./ReportRoutes"));
router.use("/quitado/:id/report", require("./ReportRoutes"));

module.exports = router;
