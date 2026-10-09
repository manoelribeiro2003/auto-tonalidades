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
 * @param {number} largura_disponivel - O tamanho da mesa de corte em centimetros
 * @param {bool} somente_largura2 - Caso queira que a função considere apenas a largura 2 da navalha
 * @returns {largura_e_batida} - Retorna um objeto com a quantidade máxima de batidas e a largura máxima das batidas
 */
export function get_largura_e_batidas(
  navalha: navalha,
  largura_disponivel: number,
  somente_largura2: boolean = false,
): largura_e_batida {
  let largura = 0;
  let count = 0;

  if (!somente_largura2) {
    while (largura + navalha.medida.largura2 <= largura_disponivel) {
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
    while (largura + navalha.medida.largura2 <= largura_disponivel) {
      largura = largura + navalha.medida.largura2;

      count = count + 1;
    }

    return {
      batidas: count,
      largura_total: largura,
    };
  }
}

// /**
//  * Retorna a informação de quantas batidas a navalha 2 faz de acordo com o tamanho da mesa e a quantidade de batidas da navalha 1.
//  *
//  * @param {navalha} navalha1 - Navalha que começa na esquerda da mesa de corte
//  * @param {navalha} navalha2 - Navalha que se quer saber a quantidade de batidas
//  * @param {number} qtd_bat_nav1 - Quantidades de batidas a considerar da navalha 1
//  * @param {number} largura_mesa - Largura da mesa total a ser considerada
//  * @returns {batidas_combinadas} - Retorna um objeto com as informações das batidas combinadas da navalha 1 e navalha 2
//  */
// export function get_larguras_e_batidas_combinadas(
//   navalha1: navalha,
//   navalha2: navalha,
//   qtd_bat_nav1: number,
//   largura_mesa: number,
// ): batidas_combinadas {
//   let larg_qtd_batidas_nav_1: number = 0;

//   if (navalha1.medida.largura1 == 0) {
//     if (qtd_bat_nav1 == 1) {
//       larg_qtd_batidas_nav_1 = navalha1.medida.largura2;
//     } else if (qtd_bat_nav1 > 1) {
//       larg_qtd_batidas_nav_1 = navalha1.medida.largura2 * qtd_bat_nav1;
//     } else if (qtd_bat_nav1 < 0) {
//       throw new Error("Erro: quantidade de batidas negativas para navalha 1");
//     }
//   } else {
//     if (qtd_bat_nav1 == 1) {
//       larg_qtd_batidas_nav_1 = navalha1.medida.largura1;
//     } else if (qtd_bat_nav1 > 1) {
//       larg_qtd_batidas_nav_1 =
//         navalha1.medida.largura1 +
//         navalha1.medida.largura2 * (qtd_bat_nav1 - 1);
//     } else if (qtd_bat_nav1 < 0) {
//       throw new Error("Erro: quantidade de batidas negativas para navalha 1");
//     }
//   }

//   let larg_disp_para_nav2 = largura_mesa - larg_qtd_batidas_nav_1;

//   let somente_largura2: boolean = false;

//   if (qtd_bat_nav1 == 0) {
//     navalha2.medida.largura1 == 0
//       ? (somente_largura2 = true)
//       : (somente_largura2 = false);
//   } else if (qtd_bat_nav1 !== 0) {
//     somente_largura2 = true;
//   }

//   const result_nav2 = get_largura_e_batidas(
//     navalha2,
//     larg_disp_para_nav2,
//     somente_largura2,
//   );

//   return {
//     tamanho_nav1: navalha1.tamanho,
//     tamanho_nav2: navalha2.tamanho,
//     largura_mesa: largura_mesa,
//     qtd_batidas_nav1: qtd_bat_nav1,
//     qtd_batidas_nav2: result_nav2.batidas,
//     largura_total: larg_qtd_batidas_nav_1 + result_nav2.largura_total,
//   };
// }

function calcularLarguraOcupada(
  largura1: number,
  largura2: number,
  batidas: number,
): number {
  if (batidas < 0) {
    throw new Error("Erro: quantidade de batidas negativas");
  }

  if (batidas === 0) {
    return 0;
  }

  if (largura1 === 0) {
    return largura2 * batidas;
  }

  return largura1 + largura2 * (batidas - 1);
}

/**
 * Retorna a informação de quantas batidas a navalha 2 faz de acordo com o
 * tamanho da mesa e a quantidade de batidas da navalha 1.
 */
export function get_larguras_e_batidas_combinadas(
  navalha1: navalha,
  navalha2: navalha,
  qtd_bat_nav1: number,
  largura_mesa: number,
): batidas_combinadas {
  const larguraOcupacaoNav1 = calcularLarguraOcupada(
    navalha1.medida.largura1,
    navalha1.medida.largura2,
    qtd_bat_nav1,
  );

  const larguraDisponivelNav2 = largura_mesa - larguraOcupacaoNav1;

  const somenteLargura2 = qtd_bat_nav1 > 0 || navalha2.medida.largura1 === 0;

  const resultadoNav2 = get_largura_e_batidas(
    navalha2,
    larguraDisponivelNav2,
    somenteLargura2,
  );

  return {
    tamanho_nav1: navalha1.tamanho,
    tamanho_nav2: navalha2.tamanho,
    largura_mesa,
    qtd_batidas_nav1: qtd_bat_nav1,
    qtd_batidas_nav2: resultadoNav2.batidas,
    largura_total: larguraOcupacaoNav1 + resultadoNav2.largura_total,
  };
}
