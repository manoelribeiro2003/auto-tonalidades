import type { navalha } from "./navalhas.model.js";

export function get_batidas(navalha: navalha, largura_mesa: number) {
  let largura = 0;
  let count = 0;

  while (largura + navalha.medidas.largura2 <= largura_mesa) {
    if (count == 1) {
      largura = largura + navalha.medidas.largura1;
    } else {
      largura = largura + navalha.medidas.largura2;
    }

    count = count + 1;
  }

  return {
    batidas: count,
    largura_total: largura,
  };
}