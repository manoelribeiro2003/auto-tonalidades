import type { navalha, tonalidade } from "./navalhas.model.js";

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

/**
 * Retorna a informação de quais são as melhores combinações de batidas por navalhas dividido por tonalidade
 */
export function melhores_batidas(
  navalhas: navalha[],
  largura_mesa: number,
  rangeMaxBatidas: number[],
  tonalidades: tonalidade[],
) {
  const melhores_batidas_por_num: Record<string, batidas_combinadas[]> = {};
  const logs: string[] = [];

  navalhas.forEach((nav1) => {
    logs.push(
      "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
    );

    const tonalidadeNav1 = tonalidades.find((ton) =>
      ton.tamanhos.includes(nav1.tamanho),
    )?.ton;

    navalhas.forEach((nav2) => {
      const tonalidadeNav2 = tonalidades.find((ton) =>
        ton.tamanhos.includes(nav2.tamanho),
      )?.ton;

      if (nav1.tamanho === nav2.tamanho || tonalidadeNav1 !== tonalidadeNav2) {
        return;
      }

      const melhoresBatidas: batidas_combinadas[] = [];

      rangeMaxBatidas.forEach((num) => {
        const resultado = get_larguras_e_batidas_combinadas(
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

      const melhores = melhoresBatidas.sort(
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
