import type { navalha } from "../data/navalhas.model.js";

// ==================================================================================================================================================================
/**
 * Tipo com a informação de quantas batidas faz uma navalha e a largura total ocupada por ela em uma sequencia
 */
export type largura_e_batida = {
  largura_total: number;
  batidas: number;
};
/**
 * Retorna a informação da largura total ocupada por uma navalha e quantas vezes é possivel encaixar uma navalha de acordo com a largura disponivel fornecida em uma sequência.
 *
 * @param {navalha} navalha - Navalha a ser feita a contagem de batidas totais disponiveis
 * @param {number} larguraDisponivel - O tamanho da mesa de corte em centimetros
 * @param {bool} somenteLargura2 - Caso queira que a função considere apenas a largura 2 da navalha
 * @returns {largura_e_batida} - Retorna um objeto com a quantidade máxima de batidas e a largura máxima das batidas
 */
function _getLarguraEBatidas(
  navalha: navalha,
  larguraDisponivel: number,
  somenteLargura2: boolean = false,
): largura_e_batida {
  let largura = 0;
  let count = 0;

  if (!somenteLargura2) {
    while (largura + navalha.medida.largura2 <= larguraDisponivel) {
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
    while (largura + navalha.medida.largura2 <= larguraDisponivel) {
      largura = largura + navalha.medida.largura2;

      count = count + 1;
    }

    return {
      largura_total: largura,
      batidas: count,
    };
  }
}
// ==================================================================================================================================================================
/**
 * Retorna a largura ocupada de uma sequencia de batidas de uma unica navalha
 * @param largura1 - Largura 1 da navalha
 * @param largura2 - Largura 2 da navalha
 * @param batidas - Qtd de batidas da sequencia
 * @returns
 */
function _getLarguraOcupada(
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
// ==================================================================================================================================================================
export type batidas_combinadas = {
  tamanho_nav1: string;
  tamanho_nav2: string;
  largura_mesa: number;
  qtd_batidas_nav1: number;
  qtd_batidas_nav2: number;
  largura_total: number;
};
/**
 * Retorna a informação de quantas batidas a navalha 2 faz de acordo com o
 * tamanho da mesa e a quantidade de batidas da navalha 1.
 */
export function getLargurasEBatidasCombinadas(
  navalha1: navalha,
  navalha2: navalha,
  qtd_bat_nav1: number,
  largura_mesa: number,
): batidas_combinadas {
  const larguraOcupacaoNav1 = _getLarguraOcupada(
    navalha1.medida.largura1,
    navalha1.medida.largura2,
    qtd_bat_nav1,
  );

  const larguraDisponivelNav2 = largura_mesa - larguraOcupacaoNav1;

  const somenteLargura2 = qtd_bat_nav1 > 0 || navalha2.medida.largura1 === 0;

  const resultadoNav2 = _getLarguraEBatidas(
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
// ==================================================================================================================================================================
/**
 * Retorna a informação de quais são as melhores combinações de batidas por navalha.
 *
 * @param navalhas Array contendo as navalhas a serem testadas por numeração.
 * @param largura_mesa Valor da largura da mesa em centímetros.
 * @param rangeMaxBatidas Quantidades de batidas que serão testadas. Por padrão utiliza os valores de 0 a 19.
 */
export function getMelhoresBatidas(
  navalhas: navalha[],
  largura_mesa: number,
  rangeMaxBatidas?: number[],
) {
  rangeMaxBatidas ??= Array.from({ length: 20 }, (_, index) => index);

  const melhores_batidas_por_num: Record<string, batidas_combinadas[]> = {};
  const logs: string[] = [];

  navalhas.forEach((nav1) => {
    logs.push(
      "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
    );

    navalhas.forEach((nav2) => {
      if (nav1.tamanho === nav2.tamanho) return;

      const melhoresBatidas: batidas_combinadas[] = [];

      rangeMaxBatidas.forEach((num) => {
        const resultado = getLargurasEBatidasCombinadas(
          nav1,
          nav2,
          num,
          largura_mesa,
        );

        if (resultado.largura_total > largura_mesa) {
          return;
        }
        melhoresBatidas.push(resultado);
      });

      const melhores = [...melhoresBatidas].sort(
        (a, b) => b.largura_total - a.largura_total,
      );

      melhores_batidas_por_num[nav1.tamanho] ??= [];

      melhores.forEach((item) => {
        logs.push(JSON.stringify(item));
        melhores_batidas_por_num[nav1.tamanho]?.push(item);
      });
      logs.push("");
    });
  });

  return {
    logs: logs.join("\n"),
    melhoresBatidasPorNum: melhores_batidas_por_num,
  };
}
