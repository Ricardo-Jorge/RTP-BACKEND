const calculationsQuitado = require("../utils/calculationsQuitado");
const models = require("../models/index");
const FormQuitado = models.FormQuitado;
const ReportQuitado = models.ReportQuitado;

// Criar os Relatórios
const createReportQuitado = async (req, res) => {
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

    const formDataQuitado = await FormQuitado.findByPk(id);
    if (!formDataQuitado) {
      return res.status(404).json({ errros: ["Formulário não encontrado."] });
    }

    const existingReport = await ReportQuitado.count({
      where: { FormQuitadoId: id },
    });

    if (existingReport) {
      return res
        .status(400)
        .json({ errors: ["Já existe um relatório para este formulário ."] });
    }

    const reportQuitado = {
      custoImpostosDia: calculationsQuitado.custoImpostosDia(formDataQuitado),
      seguroDia: calculationsQuitado.seguroDia(formDataQuitado),
      manutencaoDia: calculationsQuitado.manutencaoDia(formDataQuitado),
      custoCombustivel: calculationsQuitado.custoCombustivel(formDataQuitado),
      custoCombustivelDia:
        calculationsQuitado.custoCombustivelDia(formDataQuitado),
      custoTotalDia: calculationsQuitado.custoTotalDia(formDataQuitado),
      custoTotal: calculationsQuitado.custoTotal(formDataQuitado),
      faturamentoTotal: calculationsQuitado.faturamentoTotal(formDataQuitado),
      faturamentoDia: calculationsQuitado.faturamentoDia(formDataQuitado),
      faturamentoHora: calculationsQuitado.faturamentoHora(formDataQuitado),
      faturamentoKm: calculationsQuitado.faturamentoKm(formDataQuitado),
      FormQuitadoId: formDataQuitado.id,
    };

    // Salvar o relatório no banco de dados
    const novoReport = await ReportQuitado.create(reportQuitado);
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

// Buscar Relatorio
const getReportQuitado = async (req, res) => {
  try {
    // id do Report
    const { id } = req.params;

    const report = await ReportQuitado.findOne({
      where: { FormQuitadoId: id },
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

module.exports = { createReportQuitado, getReportQuitado };
