/**
 * Funções utilitárias de formatação — Rota Motores
 */

export function formatarMoeda(valor) {
  const numero = Number(valor) || 0;
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function formatarKm(quilometragem) {
  const km = Number(quilometragem) || 0;
  return `${km.toLocaleString("pt-BR")} km`;
}

export function formatarData(dataString) {
  if (!dataString) return "";
  try {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  } catch {
    return dataString;
  }
}

export function formatarEntradaNumero(valorStr) {
  if (typeof valorStr === "number") return valorStr;
  if (!valorStr) return 0;
  // Limpa caracteres não numéricos exceto ponto e vírgula
  const limpo = valorStr.toString().replace(/[^\d,\.]/g, "").replace(",", ".");
  return parseFloat(limpo) || 0;
}
