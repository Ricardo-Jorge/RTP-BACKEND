const models = require("../models/index");
const FormAlugado = models.FormAlugado;
const ReportAlugado = models.ReportAlugado;
const calculations = require("../utils/calculationsAlugado");

// Criar os Relatórios
const createReportAlugado = async (req, res) => {
  try {
    const reqUser = req.user;

    if (!reqUser) {
      return res.status(401).json({ errors: ["Usuário não autenticado."] });
    }
    // Supondo que o ID do formAlugado venha como parâmetro na rota
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ errors: ["ID do formulário não fornecido."] });
    }

    // Buscar o registro do formAlugado no banco de dados
    const formData = await FormAlugado.findByPk(id);
    if (!formData) {
      return res.status(404).json({ errors: ["Formulário não encontrado."] });
    }

    const existingReport = await ReportAlugado.findOne({
      where: { FormAlugadoId: id },
    });

    if (existingReport) {
      return res
        .status(400)
        .json({ errors: ["Já existe um relatório para este formulário ."] });
    }

    // Realizar os cálculos utilizando os dados do formAlugado
    const reportAlugado = {
      custoAluguelDia: calculations.custoAluguelDia(formData),
      custoAluguelMes: calculations.custoAluguelMensal(formData),
      custoCombustivelSem: calculations.custoCombustivelSem(formData),
      custoCombustivelDia: calculations.consumoDiario(formData),
      faturamentoTotal: calculations.faturamentoTotal(formData),
      faturamentoDia: calculations.faturamentoDiario(formData),
      faturamentoHora: calculations.faturamentoHora(formData),
      faturamentoKm: calculations.faturamentoKm(formData),
      custoDia: calculations.custoDiario(formData),
      FormAlugadoId: formData.id,
    };

    // Salvar o relatório no banco de dados
    const novoReport = await ReportAlugado.create(reportAlugado);

    // Retornar o relatório criado para o usuário
    return res.status(200).json(novoReport);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: ["Erro ao processar o relatório."],
    });
  }
};

// Buscar todos Relatórios
const getReportsAlugado = async (req, res) => {
  try {
    const { id } = req.params;

    const reports = await ReportAlugado.findOne({
      where: { FormAlugadoId: id },
    });
    if (!reports) {
      return res.status(404).json({ errors: ["Relatório não encontrado."] });
    }
    return res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro ao buscar relatório."] });
  }
};

module.exports = { createReportAlugado, getReportsAlugado };
