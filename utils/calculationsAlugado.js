const custoAluguelMensal = (formData) => {
  const { valorFranquiaSem } = formData;
  if (!valorFranquiaSem) return 0;
  return (parseFloat(valorFranquiaSem) / 7) * 30;
};

const custoAluguelDia = (formData) => {
  const aluguelMensalValue = custoAluguelMensal(formData);
  return aluguelMensalValue / 26;
};

const custoCombustivelSem = (formData) => {
  const { kilometragemSem, consumo, precoCombustivel } = formData;
  if (!kilometragemSem || !consumo || !precoCombustivel) return 0;
  return (kilometragemSem / consumo) * precoCombustivel;
};

const consumoDiario = (formData) => {
  const { diasTrabalhadosSem } = formData;
  if (!diasTrabalhadosSem) return 0;
  const consumoSemanal = custoCombustivelSem(formData);
  return consumoSemanal / diasTrabalhadosSem;
};

const faturamentoTotal = (formData) => {
  const { lucroEsperado, valorFranquiaSem } = formData;
  if (!lucroEsperado || !valorFranquiaSem) return 0;
  const consumoDiarioValue = consumoDiario(formData);
  const aluguelTotal = custoAluguelMensal(formData);
  return parseFloat(lucroEsperado) + aluguelTotal + consumoDiarioValue * 26;
};

const faturamentoDiario = (formData) => {
  const faturamentoTotalValue = faturamentoTotal(formData);
  return faturamentoTotalValue / 26;
};

const faturamentoHora = (formData) => {
  const { horasTrabalhadas } = formData;
  if (!horasTrabalhadas) return 0;
  const faturamentoDiarioValue = faturamentoDiario(formData);
  return faturamentoDiarioValue / parseInt(horasTrabalhadas);
};

const faturamentoKm = (formData) => {
  const { kilometragemSem } = formData;
  if (!kilometragemSem) return 0;
  const franquiaTotal = kilometragemSem * 4;
  const faturamentoTotalValue = faturamentoTotal(formData);
  return faturamentoTotalValue / franquiaTotal;
};

const custoDiario = (formData) => {
  return consumoDiario(formData) + custoAluguelDia(formData);
};

module.exports = {
  custoAluguelDia,
  custoAluguelMensal,
  custoCombustivelSem,
  consumoDiario,
  faturamentoTotal,
  faturamentoDiario,
  faturamentoHora,
  faturamentoKm,
  custoDiario,
};
