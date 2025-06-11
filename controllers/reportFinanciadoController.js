const models = require("../models/index");
const FormFinanciado = models.FormFinanciado;
const ReportFinanciado = models.ReportFinanciado;
const calculationsFinanciado = require("../utils/calculationsFinanciado");

// Criar os Relatórios
const createReportFinanciado = async (req, res) => {
  try {
    const reqUser = req.user;

    if (!reqUser) {
      return res.status(401).json({ errors: ["Usuário não autenticado."] });
    }

    // id do Formulário
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ errors: ["ID do formulário não fornecido."] });
    }

    const formDataFinanciado = await FormFinanciado.findByPk(id);
    if (!formDataFinanciado) {
      return res.status(404).json({ errors: ["Formulário não encontrado."] });
    }

    const existingReport = await ReportFinanciado.count({
      where: { FormFinanciadoId: id },
    });

    if (existingReport) {
      return res
        .status(400)
        .json({ errors: ["Já existe um relatório para este formulário ."] });
    }

    // Calculos utilizando os dados de FormFinanciado
    const reportFinanciado = {
      custoFinanciamentoDia:
        calculationsFinanciado.custoFinanciamentoDia(formDataFinanciado),
      custoImpostosDia:
        calculationsFinanciado.custoImpostosDia(formDataFinanciado),
      seguroDia: calculationsFinanciado.seguroDia(formDataFinanciado),
      manutencaoDia: calculationsFinanciado.manutencaoDia(formDataFinanciado),
      custoCombustivel:
        calculationsFinanciado.custoCombustivel(formDataFinanciado),
      custoCombustivelDia:
        calculationsFinanciado.custoCombustivelDia(formDataFinanciado),
      custoTotalDia: calculationsFinanciado.custoTotalDia(formDataFinanciado),
      custoTotal: calculationsFinanciado.custoTotal(formDataFinanciado),
      faturamentoTotal:
        calculationsFinanciado.faturamentoTotal(formDataFinanciado),
      faturamentoDia: calculationsFinanciado.faturamentoDia(formDataFinanciado),
      faturamentoKm: calculationsFinanciado.faturamentoKm(formDataFinanciado),
      FormFinanciadoId: formDataFinanciado.id,
    };

    // Salvar o relatório no banco de dados
    const novoReport = await ReportFinanciado.create(reportFinanciado);

    return res
      .status(200)
      .json({ message: ["Relatório criado com sucesso."], novoReport });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: ["Erro ao processar o relatório."],
    });
  }
};

// Buscar todo Relatório
const getReportFinanciado = async (req, res) => {
  try {
    // id do Report
    const { id } = req.params;

    const report = await ReportFinanciado.findOne({
      where: { FormFinanciadoId: id },
    });
    if (!report) {
      return res.status(404).json({ errors: ["Relatório não encontrado."] });
    }
    return res.status(200).json(report);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errors: ["Erro ao buscar relatório."] });
  }
};

module.exports = { createReportFinanciado, getReportFinanciado };
