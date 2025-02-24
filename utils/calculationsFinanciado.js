const diasTrabalhados = (formDataFinanciado) => {
  const { folgasMensal } = formDataFinanciado;
  const diasTrabalhadosValue = 30 - Number(folgasMensal);
  return diasTrabalhadosValue;
};

const custoFinanciamentoDia = (formDataFinanciado) => {
  const { parcelaFinanciamento } = formDataFinanciado;
  if (!parcelaFinanciamento) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const financiamentoDiaValue =
    Number(parcelaFinanciamento) / diasTrabalhadosValue;
  return financiamentoDiaValue;
};

const custoImpostos = (formDataFinanciado) => {
  const { ipva, licenciamento } = formDataFinanciado;
  if (!ipva || !licenciamento) return 0;
  const totalValueImpostos = Number(ipva) + Number(licenciamento);
  return totalValueImpostos;
};

const custoImpostosDia = (formDataFinanciado) => {
  const impostosDiaValue = custoImpostos(formDataFinanciado);
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);

  return impostosDiaValue / 12 / diasTrabalhadosValue;
};

const seguroDia = (formDataFinanciado) => {
  const { seguro } = formDataFinanciado;
  if (!seguro) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const seguroDiaValue = Number(seguro) / diasTrabalhadosValue;
  return seguroDiaValue;
};

const manutencaoDia = (formDataFinanciado) => {
  const { manutencao } = formDataFinanciado;
  if (!manutencao) return 0;
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const manutencaoDiaValue = Number(manutencao) / diasTrabalhadosValue;
  return manutencaoDiaValue;
};

const custoCombustivel = (formDataFinanciado) => {
  const { kilometragemMes, precoCombustivel, consumo } = formDataFinanciado;
  if (!kilometragemMes || !precoCombustivel || !consumo) return 0;
  const consumoMensal =
    Number(kilometragemMes / consumo) * Number(precoCombustivel);
  return consumoMensal;
};

const custoCombustivelDia = (formDataFinanciado) => {
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const consumoMensal = custoCombustivel(formDataFinanciado);
  const consumoDiarioValue = consumoMensal / diasTrabalhadosValue;
  return consumoDiarioValue;
};

const custoTotalDia = (formDataFinanciado) => {
  const financiamentoDiaValue = custoFinanciamentoDia(formDataFinanciado);
  const impostosDiaValue = custoImpostosDia(formDataFinanciado);
  const seguroDiaValue = seguroDia(formDataFinanciado);
  const manutencaoDiaValue = manutencaoDia(formDataFinanciado);
  const consumoDiaValue = custoCombustivelDia(formDataFinanciado);
  const custoTotalDia =
    financiamentoDiaValue +
    impostosDiaValue +
    seguroDiaValue +
    manutencaoDiaValue +
    consumoDiaValue;
  return custoTotalDia;
};

const custoTotal = (formDataFinanciado) => {
  const { parcelaFinanciamento, seguro, manutencao } = formDataFinanciado;
  if (!parcelaFinanciamento || !seguro || !manutencao) return 0;
  const custoCombustivelValue = custoCombustivel(formDataFinanciado);
  const custoImpostosValue = custoImpostos(formDataFinanciado);
  const custoTotalValue =
    Number(parcelaFinanciamento) +
    Number(seguro) +
    Number(manutencao) +
    custoCombustivelValue +
    custoImpostosValue / 12;
  return custoTotalValue;
};

const faturamentoTotal = (formDataFinanciado) => {
  const { lucroEsperado } = formDataFinanciado;
  if (!lucroEsperado) return 0;
  const custoTotalValue = custoTotal(formDataFinanciado);
  const faturamentoTotalValue = Number(lucroEsperado) + custoTotalValue;
  return faturamentoTotalValue;
};

const faturamentoDia = (formDataFinanciado) => {
  const faturamentoTotalValue = faturamentoTotal(formDataFinanciado);
  const diasTrabalhadosValue = diasTrabalhados(formDataFinanciado);
  const faturamentoDiaValue = faturamentoTotalValue / diasTrabalhadosValue;
  return faturamentoDiaValue;
};

const faturamentoKm = (formDataFinanciado) => {
  const { kilometragemMes } = formDataFinanciado;
  if (!kilometragemMes) return 0;
  const faturamentoTotalValue = faturamentoTotal(formDataFinanciado);
  const faturamentoKmValue = faturamentoTotalValue / Number(kilometragemMes);
  return faturamentoKmValue;
};

module.exports = {
  custoFinanciamentoDia,
  custoImpostosDia,
  seguroDia,
  manutencaoDia,
  custoCombustivel,
  custoCombustivelDia,
  custoTotalDia,
  custoTotal,
  faturamentoTotal,
  faturamentoDia,
  faturamentoKm,
};
