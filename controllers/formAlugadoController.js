const models = require("../models/index");
const FormAlugado = models.FormAlugado;
const User = models.User;

// Criar Formulário
const createFormAlugado = async (req, res) => {
  try {
    console.log("Usuário logado:", req.user);

    if (!req.user) {
      return res.status(401).json({ errors: "Usuário não autenticado" });
    }

    // Obtém os dados do formulário enviados no body
    const {
      lucroEsperado,
      valorFranquiaSem,
      precoCombustivel,
      consumo,
      diasTrabalhadosSem,
      horasTrabalhadas,
      kilometragemSem,
    } = req.body;

    const reqUser = req.user;

    const user = await User.findByPk(reqUser.id);

    // Cria o novo formulário no banco de dados
    const newForm = await FormAlugado.create({
      lucroEsperado,
      valorFranquiaSem,
      precoCombustivel,
      consumo,
      diasTrabalhadosSem,
      horasTrabalhadas,
      kilometragemSem,
      UserId: user.id,
    });

    return res.status(201).json({
      message: "Formulário criado com sucesso.",
      form: newForm,
    });
  } catch (error) {
    console.error("Erro ao criar formulário", error);

    // Captura erros de validação do Sequelize
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        errors: err.message,
      }));

      return res.status(422).json({
        message: "Erro de validação",
        errors: validationErrors,
      });
    }

    return res.status(500).json({
      message: "Erro ao criar formulário",
      errors: error.message,
    });
  }
};

// Buscar os Formulários do Usuário
const getFormsAlugado = async (req, res) => {
  try {
    const UserId = req.user.id;
    const forms = await FormAlugado.findAll({
      where: { UserId },
      order: [["createdAt", "DESC"]], // opcional: ordenar por data de criação
    });
    return res.status(200).json(forms);
  } catch (error) {
    console.error("Erro ao buscar formulários:", error);
    return res
      .status(500)
      .json({ errors: "Erro ao buscar formulários", error });
  }
};

// Editar Formulário
const updateForm = async (req, res) => {
  try {
    const {
      lucroEsperado,
      valorFranquiaSem,
      precoCombustivel,
      consumo,
      diasTrabalhadosSem,
      horasTrabalhadas,
      kilometragemSem,
    } = req.body;
    const { id } = req.params;
    const UserId = req.user.id;

    const form = await FormAlugado.findOne({ where: { id, UserId } });
    if (!form) {
      return res.status(404).json({ errors: "Formulário não encontrado." });
    }

    if (lucroEsperado) {
      form.lucroEsperado = lucroEsperado;
    }
    if (valorFranquiaSem) {
      form.valorFranquiaSem = valorFranquiaSem;
    }
    if (precoCombustivel) {
      form.precoCombustivel = precoCombustivel;
    }
    if (consumo) {
      form.consumo = consumo;
    }
    if (diasTrabalhadosSem) {
      form.diasTrabalhadosSem = diasTrabalhadosSem;
    }
    if (horasTrabalhadas) {
      form.horasTrabalhadas = horasTrabalhadas;
    }
    if (kilometragemSem) {
      form.kilometragemSem = kilometragemSem;
    }

    await form.save();

    res.status(200).json({ form });
  } catch (error) {
    return res.status(500).json({ errors: "Erro ao atualizar formulário." });
  }
};

// Deletar Formuário do Usuário
const deleteFormAlugado = async (req, res) => {
  try {
    const { id } = req.params; // id do formulário a ser deletado
    const UserId = req.user.id;

    // Procura o formulário garantindo que ele pertence ao usuário logado
    const form = await FormAlugado.findOne({ where: { id, UserId } });
    if (!form) {
      return res.status(404).json({ errors: "Formulário não encontrado." });
    }

    await form.destroy();

    return res
      .status(200)
      .json({ message: "Formulário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar formulário:", error);
    return res
      .status(500)
      .json({ errors: "Erro ao deletar formulário", error });
  }
};

module.exports = {
  createFormAlugado,
  getFormsAlugado,
  updateForm,
  deleteFormAlugado,
};
