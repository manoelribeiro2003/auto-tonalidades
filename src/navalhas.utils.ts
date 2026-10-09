import type { navalha } from "./navalhas.model.js";

export type larguras_e_batidas = {
  tamanho: string;
  tipo: string;
  batidas: number;
  largura_total: number;
};

export type largura_e_batida = {
  batidas: number;
  largura_total: number;
};

export type batidas_combinadas = {
  tamanho_nav1: string;
  tamanho_nav2: string;
  largura_mesa: number;
  qtd_batidas_nav1: number;
  qtd_batidas_nav2: number;
  largura_total: number;
};

/**
 * Retorna a informação de quantas vezes é possivel encaixar a navalha de acordo com a largura fornecida.
 *
 * @param {navalha} navalha - Navalha a ser feita a contagem de batidas totais disponiveis
 * @param {number} largura_mesa - O tamanho da mesa de corte em centimetros
 * @param {bool} somente_largura2 - Caso queira que a função considere apenas a largura 2 da navalha
 * @returns {largura_e_batida} - Retorna um objeto com a quantidade máxima de batidas e a largura máxima das batidas
 */
export function get_largura_e_batidas(
  navalha: navalha,
  largura_mesa: number,
  somente_largura2: boolean = false,
): largura_e_batida {
  let largura = 0;
  let count = 0;

  if (!somente_largura2) {
    while (largura + navalha.medida.largura2 <= largura_mesa) {
      if (count == 1) {
        largura = largura + navalha.medida.largura1;
      } else {
        largura = largura + navalha.medida.largura2;
      }

      count = count + 1;
    }

    return {
      batidas: count,
      largura_total: largura,
    };
  } else {
    while (largura + navalha.medida.largura2 <= largura_mesa) {
      largura = largura + navalha.medida.largura2;

      count = count + 1;
    }

    return {
      batidas: count,
      largura_total: largura,
    };
  }
}

/**
 * Retorna a quantidade de batidas de um conjunto de navalhas de acordo com o tamanho total da mesa.
 *
 * @param {navalha[]} navalhas - Navalhas a serem feitas a contagem de batidas totais disponiveis
 * @param {number} largura_mesa - O tamanho da mesa de corte em centimetros
 * @returns {largura_e_batida[]} - Retorna um array com objetos com a quantidade máxima de batidas e a largura máxima das batidas de cad navalha
 */
export function get_larguras_e_batidas(
  navalhas: navalha[],
  largura_mesa: number,
) {
  const larguras_e_batidas: larguras_e_batidas[] = [];

  navalhas.forEach((navalha) => {
    larguras_e_batidas.push({
      tamanho: navalha.tamanho,
      tipo: navalha.tipo,
      batidas: get_largura_e_batidas(navalha, largura_mesa).batidas,
      largura_total: get_largura_e_batidas(navalha, largura_mesa).largura_total,
    });
  });

  return larguras_e_batidas;
}

/**
 * Retorna a informação de quantas batidas a navalha 2 faz de acordo com o tamanho da mesa e a quantidade de batidas da navalha 1.
 *
 * @param {navalha} navalha1 - Navalha que começa na esquerda da mesa de corte
 * @param {navalha} navalha2 - Navalha que se quer saber a quantidade de batidas
 * @param {number} qtd_bat_nav1 - Quantidades de batidas a considerar da navalha 1
 * @param {number} largura_mesa - Largura da mesa total a ser considerada
 * @returns {batidas_combinadas} - Retorna um objeto com as informações das batidas combinadas da navalha 1 e navalha 2
 */
export function get_larguras_e_batidas_combinadas(
  navalha1: navalha,
  navalha2: navalha,
  qtd_bat_nav1: number,
  largura_mesa: number,
): batidas_combinadas {
  let larg_qtd_batidas_nav_1 = 0;

  if (qtd_bat_nav1 == 1) {
    larg_qtd_batidas_nav_1 = navalha1.medida.largura1;
  } else if (qtd_bat_nav1 > 1) {
    larg_qtd_batidas_nav_1 =
      navalha1.medida.largura1 + navalha1.medida.largura2 * (qtd_bat_nav1 - 1);
  } else if (qtd_bat_nav1 < 0) {
    throw new Error("Erro: quantidade de batidas negativas para navalha 1");
  }

  let larg_disp_para_nav2 = largura_mesa - larg_qtd_batidas_nav_1;

  const result_nav2 = get_largura_e_batidas(
    navalha2,
    larg_disp_para_nav2,
    qtd_bat_nav1 !== 0,
  );

  return {
    tamanho_nav1: navalha1.tamanho,
    tamanho_nav2: navalha2.tamanho,
    largura_mesa: largura_mesa,
    qtd_batidas_nav1: qtd_bat_nav1,
    qtd_batidas_nav2: result_nav2.batidas,
    largura_total: larg_qtd_batidas_nav_1 + result_nav2.largura_total,
  };
}

/**
 * Método para printar no terminal os valores das propriedades das navalhas.
 *
 * @param {larguras_e_batidas} larguras_e_batidas - Objeto onde há o valor do tamanho da navalha, tipo da navalha, a quantidade de batidas e a largura total
 */
export function print_larguras_e_batidas(
  larguras_e_batidas: larguras_e_batidas[],
) {
  console.log("-----------------------------------------------------------");
  larguras_e_batidas.forEach((item) => {
    console.log(`
        tamanho: ${item.tamanho}
        tipo: ${item.tipo}
        batidas: ${item.batidas}
        largura total: ${item.largura_total}
        `);
  });
  console.log("-----------------------------------------------------------");
}
