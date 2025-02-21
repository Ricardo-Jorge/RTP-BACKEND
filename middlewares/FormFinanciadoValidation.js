const { body } = require("express-validator");

const FormFinanciadoValidate = () => {
  return [
    body("lucroEsperado")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("precoCombustivel")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("consumo")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("folgasMensal")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isInt({ min: 1, max: 20 })
      .withMessage("O valor deve ser entre 4 e 7 dias.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("horasTrabalhadas")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isInt({ min: 1, max: 24 })
      .withMessage("Insira um número inteiro entre 1 e 24.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("ipva")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("licenciamento")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("seguro")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("manutencao")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("parcelaFinanciamento")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
    body("kilometragemMes")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not()
      .isString()
      .withMessage("O valor desse campo não pode ser um texto."),
  ];
};

module.exports = FormFinanciadoValidate;
