const models = require("../models/index");
const FormQuitado = models.FormQuitado;
const User = models.User;

// Criar Formulário
const createFormQuitado = async (req, res) => {
  try {
    console.log("Usuário Logado: ", req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    // Obter os dados do formulário através do body
    const {
      lucroEsperado,
      precoCombustivel,
      consumo,
      folgasMensal,
      horasTrabalhadas,
      ipva,
      licenciamento,
      seguro,
      manutencao,
      kilometragemMes,
    } = req.body;

    const reqUser = req.user;
    const user = await User.fidByPk(reqUser.id);

    // Limitação de criação de Formulário por User
    const existingForms = await FormQuitado.count({
      where: { UserId: user.id },
    });

    if (existingForms >= 2) {
      return res.status(400).json({
        errors:
          "Você já atingiu o limite de Formulários. Limite de UM Formulário por categoria.",
      });
    }

    // Cria novo Formulário no DB
    const newForm = await FormQuitado.create({
      lucroEsperado,
      precoCombustivel,
      consumo,
      folgasMensal,
      horasTrabalhadas,
      ipva,
      licenciamento,
      seguro,
      manutencao,
      kilometragemMes,
      UserId: user.id,
    });

    return res
      .status(201)
      .json({ message: "Formulário criado com sucesso.", form: newForm });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "Erro ao criar formulário, tente novamente mais tarde.",
    });
  }
};

// Buscar of Dormulários do Usuário
const getFormsQuitado = async (req, res) => {
  try {
    const UserId = req.user.id;
    const forms = await FormQuitado.findAll({
      where: { UserId },
      order: [["createdAt", "DESC"]],
    });

    if (!forms) {
      return res
        .send(404)
        .json({ message: "Formulário(s) não encontrado(s)." });
    }
    return res.status(200).json(forms);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errors: "Erro ao buscar Formulário(s), tente novamente mais tarde.",
    });
  }
};

// Editar Formulário
const updateFormQuitado = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { id } = req.params;
    const {
      lucroEsperado,
      precoCombustivel,
      consumo,
      folgasMensal,
      horasTrabalhadas,
      ipva,
      licenciamento,
      seguro,
      manutencao,
      kilometragemMes,
    } = req.body;

    const form = await FormQuitado.findOne({ where: { id, UserId } });
    if (!form) {
      return res.status(404).json({ errors: "Formulário não encontrado." });
    }

    if (lucroEsperado) {
      form.lucroEsperado = lucroEsperado;
    }
    if (precoCombustivel) {
      form.precoCombustivel = precoCombustivel;
    }
    if (consumo) {
      form.consumo = consumo;
    }
    if (folgasMensal) {
      form.folgasMensal = folgasMensal;
    }
    if (horasTrabalhadas) {
      form.horasTrabalhadas = horasTrabalhadas;
    }
    if (ipva) {
      form.ipva = ipva;
    }
    if (licenciamento) {
      form.licenciamento = licenciamento;
    }
    if (seguro) {
      form.seguro = seguro;
    }
    if (manutencao) {
      form.manutencao = manutencao;
    }
    if (kilometragemMes) {
      form.kilometragemMes = kilometragemMes;
    }

    await form.save();
    res
      .status(200)
      .json({ message: "Formulário atualizado com sucesso.", form: form });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: "Erro ao atualizar formulário, tente novamente mais tarde.",
    });
  }
};

// Deletar Formulário
const deleteFormQuitado = async (req, res) => {
  try {
    const { id } = req.params; // id do formulário a ser deletado
    const UserId = req.user.id;

    // Procura o formulário garantindo que ele pertence ao usuário logado
    const form = await FormQuitado.findOne({ where: { id, UserId } });
    if (!form) {
      return res.status(404).json({ errors: "Formulário não encontrado." });
    }

    await form.destroy();

    return res
      .status(200)
      .json({ message: "Formulário deletado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: "Erro ao deletar formulário" });
  }
};

module.exports = {
  createFormQuitado,
  getFormsQuitado,
  updateFormQuitado,
  deleteFormQuitado,
};
