import type { navalha } from "../data/models/types/navalha.type.js";
import type { ReservaDeTom } from "../data/models/types/reservaDeTom.type.js";
import type { tonalidade } from "../data/models/types/tonalidade.type.js";
import {
  getMelhoresBatidas,
  type melhores_batidas,
} from "./batidas_e_larguras.utils.js";
import type { novoConsumoDasNavalhas } from "./consumo.utils.js";

type resultadoOtimizacao = {
  tonalidades: tonalidade[];
  melhoresBatidas: melhores_batidas;
};

export function otimizarTonalidadesEBatidas(
  reservasDeTons: ReservaDeTom[],
  navalhas: navalha[],
  consumosDasNavalhas: novoConsumoDasNavalhas[],
  largura_mesa: number,
  rangeMaxBatidas?: number[],
): resultadoOtimizacao {
  const reservasOrdenadas = [...reservasDeTons].sort(
    (a, b) => b.reserva - a.reserva,
  );

  const consumosCombinados = consumosDasNavalhas.reduce((acc, navalha) => {
    for (const [tamanho, consumo] of navalha.consumo) {
      acc.set(tamanho, (acc.get(tamanho) ?? 0) + consumo);
    }

    return acc;
  }, new Map<string, number>());

  if (reservasOrdenadas.length === 0) {
    if (consumosCombinados.size > 0) {
      throw new Error("Não existem reservas de tons disponíveis.");
    }

    return {
      tonalidades: [],
      melhoresBatidas: {
        todasCombinacoesDeBatidas: {},
        logs: "",
      },
    };
  }

  const EPSILON = 1e-9;

  // Processa primeiro os tamanhos de maior consumo.
  const tamanhosOrdenados = [...consumosCombinados.entries()].sort(
    (a, b) => b[1] - a[1],
  );

  const consumoPorReserva = reservasOrdenadas.map(() => 0);
  const tamanhosPorReserva = reservasOrdenadas.map(() => [] as string[]);

  let melhorResultado: resultadoOtimizacao | undefined;
  let melhorConsumoMaiorReserva = -1;
  let melhorPontuacaoBatidas = -Infinity;
  let maiorReservaPreenchida = false;

  function pontuarBatidas(resultado: melhores_batidas): number {
    // Considera a melhor largura encontrada para cada par de tamanhos.
    const melhorLarguraPorPar = new Map<string, number>();

    for (const combinacoes of Object.values(
      resultado.todasCombinacoesDeBatidas,
    )) {
      for (const combinacao of combinacoes) {
        const chave = [combinacao.tamanho_nav1, combinacao.tamanho_nav2]
          .sort()
          .join("|");

        const larguraAtual = melhorLarguraPorPar.get(chave) ?? 0;

        if (combinacao.largura_total > larguraAtual) {
          melhorLarguraPorPar.set(chave, combinacao.largura_total);
        }
      }
    }

    return [...melhorLarguraPorPar.values()].reduce(
      (total, largura) => total + largura,
      0,
    );
  }

  function avaliarDistribuicao(): void {
    const tonalidadesCandidatas: tonalidade[] = reservasOrdenadas.flatMap(
      (reserva, indice) => {
        const tamanhos = tamanhosPorReserva[indice]!;

        if (tamanhos.length === 0) {
          return [];
        }

        return [
          {
            tom: reserva.tom,
            reserva: consumoPorReserva[indice]!,
            tamanhos: [...tamanhos],
          },
        ];
      },
    );

    const consumoMaiorReserva = consumoPorReserva[0]!;
    const reservaMaxima = reservasOrdenadas[0]!.reserva;

    const preencheExatamente =
      Math.abs(consumoMaiorReserva - reservaMaxima) <= EPSILON;

    const batidasCandidatas = getMelhoresBatidas(
      navalhas,
      largura_mesa,
      tonalidadesCandidatas,
      rangeMaxBatidas,
    );

    const pontuacao = pontuarBatidas(batidasCandidatas);

    const deveSubstituir =
      melhorResultado === undefined ||
      (preencheExatamente && !maiorReservaPreenchida) ||
      (preencheExatamente === maiorReservaPreenchida &&
        consumoMaiorReserva > melhorConsumoMaiorReserva + EPSILON) ||
      (preencheExatamente === maiorReservaPreenchida &&
        Math.abs(consumoMaiorReserva - melhorConsumoMaiorReserva) <= EPSILON &&
        pontuacao > melhorPontuacaoBatidas);

    if (deveSubstituir) {
      melhorResultado = {
        tonalidades: tonalidadesCandidatas,
        melhoresBatidas: batidasCandidatas,
      };

      maiorReservaPreenchida = preencheExatamente;
      melhorConsumoMaiorReserva = consumoMaiorReserva;
      melhorPontuacaoBatidas = pontuacao;
    }
  }

  function buscarDistribuicoes(indiceTamanho: number): void {
    if (indiceTamanho === tamanhosOrdenados.length) {
      avaliarDistribuicao();
      return;
    }

    const [tamanho, consumo] = tamanhosOrdenados[indiceTamanho]!;

    for (
      let indiceReserva = 0;
      indiceReserva < reservasOrdenadas.length;
      indiceReserva++
    ) {
      const reserva = reservasOrdenadas[indiceReserva]!;
      const consumoAtual = consumoPorReserva[indiceReserva]!;

      if (consumoAtual + consumo > reserva.reserva + EPSILON) {
        continue;
      }

      consumoPorReserva[indiceReserva] = consumoAtual + consumo;
      tamanhosPorReserva[indiceReserva]!.push(tamanho);

      buscarDistribuicoes(indiceTamanho + 1);

      tamanhosPorReserva[indiceReserva]!.pop();
      consumoPorReserva[indiceReserva] = consumoAtual;
    }
  }

  buscarDistribuicoes(0);

  if (!melhorResultado) {
    throw new Error(
      "Não foi encontrada uma distribuição viável para todos os tamanhos e reservas.",
    );
  }

  return melhorResultado;
}
