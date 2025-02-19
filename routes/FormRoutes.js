const express = require("express");
const router = express.Router();

// Controller
const {
  createFormAlugado,
  getFormsAlugado,
  updateForm,
  deleteFormAlugado,
} = require("../controllers/formAlugadoController");

// Middleware
const formAlugadoValidate = require("../middlewares/FormAlugadoValidation");
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");

// Rota para criar um novo formulário de carro alugado
router.post(
  "/alugado",
  authGuard,
  formAlugadoValidate(),
  validate,
  createFormAlugado
);

// Rota para buscar os formulários do usuário logado
router.get("/alugado", authGuard, getFormsAlugado);

// Rota para atualizar Form
router.put(
  "/alugado/:id",
  authGuard,
  formAlugadoValidate(),
  validate,
  updateForm
);

// Rota para deletar um formulário (usando parâmetro :id)
router.delete("/alugado/:id", authGuard, deleteFormAlugado);

// Monta as rotas de relatórios aninhadas
router.use("/alugado/:id/report", require("./ReportRoutes"));

module.exports = router;
