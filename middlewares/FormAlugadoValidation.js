const { body } = require("express-validator");

const formAlugadoValidate = () => {
  return [
    body("horasTrabalhadas")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isInt({ min: 1, max: 24 })
      .withMessage("Insira um número inteiro entre 1 e 24.")
      .bail()
      .not(),
    body("lucroEsperado")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("valorFranquiaSem")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("kilometragemSem")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isFloat({ gt: 0 })
      .withMessage("O valor deve ser maior que zero.")
      .bail()
      .not(),
    body("diasTrabalhadosSem")
      .exists()
      .withMessage("O campo é obrigatório.")
      .isInt({ min: 4, max: 7 })
      .withMessage("O valor deve ser entre 4 e 7 dias.")
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
  ];
};

module.exports = formAlugadoValidate;
