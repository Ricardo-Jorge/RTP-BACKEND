const { body } = require("express-validator");

const FormFinanciadoValidate = () => {
  return [
    body("lucroEsperado")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("precoCombustivel")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("consumo")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("folgasMensal")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isInt({ min: 1, max: 20 })
      .withMessage("O valor deve ser entre 4 e 7 dias.")
      .bail()
      .not(),
    body("horasTrabalhadas")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isInt({ min: 1, max: 24 })
      .withMessage("Insira um número inteiro entre 1 e 24.")
      .bail()
      .not(),
    body("ipva")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("licenciamento")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("seguro")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("manutencao")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("parcelaFinanciamento")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("kilometragemMes")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
  ];
};

module.exports = FormFinanciadoValidate;
