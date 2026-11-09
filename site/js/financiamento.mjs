/**
 * Motor de cálculo de financiamento — Rota Motores
 * Taxa mensal fixa de 1,49% a.m. conforme briefing.md e conteudo.md
 */

import { formatarMoeda } from "./formatters.mjs";

export const TAXA_MENSAL_FIXA = 0.0149; // 1,49% ao mês
export const ENTRADA_MINIMA = 100;
export const SALDO_MINIMO_FINANCIADO = 100.0; // R$ 100,00

export const AVISO_LEGAL_FINANCIAMENTO = 
  "Simulação acadêmica. A estimativa não constitui proposta de crédito e não inclui tarifas, impostos ou seguros.";

/**
 * Calcula os valores de financiamento pela Tabela Price (amortização francesa com parcelas fixas)
 * PMT = P * [ i * (1 + i)^n ] / [ (1 + i)^n - 1 ]
 *
 * @param {number} valorVeiculo - Valor total do veículo
 * @param {number} valorEntrada - Valor pago como entrada
 * @param {number} prazoMeses - Quantidade de parcelas mensais (ex: 12, 24, 36, 48, 60)
 * @returns {object} Detalhes do cálculo ou objeto com erro
 */
export function calcularFinanciamento(valorVeiculo, valorEntrada, prazoMeses) {
  const preco = Number(valorVeiculo) || 0;
  const entrada = Number(valorEntrada) || 0;
  const meses = parseInt(prazoMeses, 10) || 0;

  if (preco <= 0) {
    return { valido: false, erro: "Informe um valor de veículo válido maior que zero." };
  }

  if (entrada < ENTRADA_MINIMA) {
    return { valido: false, erro: `Informe uma entrada de pelo menos ${formatarMoeda(ENTRADA_MINIMA)}.` };
  }

  if (entrada >= preco) {
    return { 
      valido: false, 
      erro: "A entrada não pode ser igual ou superior ao valor total do veículo. Para compra à vista, entre em contato." 
    };
  }

  const saldoFinanciado = Math.round((preco - entrada) * 100) / 100;

  if (saldoFinanciado < SALDO_MINIMO_FINANCIADO) {
    return { 
      valido: false, 
      erro: `O saldo a ser financiado deve ser de no mínimo R$ ${SALDO_MINIMO_FINANCIADO.toFixed(2).replace('.', ',')}.` 
    };
  }

  if (meses <= 0 || meses > 84) {
    return { valido: false, erro: "Selecione um prazo entre 1 e 84 meses." };
  }

  const i = TAXA_MENSAL_FIXA;
  const fator = Math.pow(1 + i, meses);
  const parcela = saldoFinanciado * ((i * fator) / (fator - 1));
  const totalFinanciamento = parcela * meses;
  const totalGeral = totalFinanciamento + entrada;
  const totalJuros = totalFinanciamento - saldoFinanciado;

  return {
    valido: true,
    precoVeiculo: preco,
    valorEntrada: entrada,
    saldoFinanciado: saldoFinanciado,
    prazoMeses: meses,
    taxaMensal: i * 100, // 1.49%
    valorParcela: parcela,
    totalFinanciadoComJuros: totalFinanciamento,
    totalPagoGeral: totalGeral,
    totalJuros: totalJuros,
    avisoLegal: AVISO_LEGAL_FINANCIAMENTO
  };
}
