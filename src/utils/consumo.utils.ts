import type {
  navalha,
  ReservaDeTom,
  tipoNavalha,
  tonalidade,
} from "../data/navalhas.model.js";

// ==================================================================================================================================================================
/**
 * Objeto que mostra a informação do consumo para as duas navalhas, onde a propriedade 'tipo' se refere ao tipo da navalha e
 * 'consumo' se refere a um objeto chave-valor do consumo por numeração
 */
export type consumoPorNavalha = {
  nav1: {
    tipo: tipoNavalha;
    consumo: Record<string, number>;
  };
  nav2: {
    tipo: tipoNavalha;
    consumo: Record<string, number>;
  };
};
/**
 * Função que retorna o consumo por cada navalha de acordo com o quantidade de pares por grade de numeros
 * @param {navalha[]} navalha1 - Array de navalhas 1
 * @param {navalha[]} navalha2 - Array de navalhas 2
 * @param {Record<string, number>} qtdPares - Quantidade de pares por numeração
 */
export function getConsumoDasNavalhas(
  navalha1: navalha[],
  navalha2: navalha[],
  qtdPares: Record<string, number>,
): consumoPorNavalha {
  const consumoPorNumNav1 = navalha1.reduce(
    (acc, navalha) => {
      acc[navalha.tamanho] = qtdPares[navalha.tamanho]! / navalha.consumo;
      return acc;
    },
    {} as Record<string, number>,
  );
  const consumoPorNumNav2 = navalha2.reduce(
    (acc, navalha) => {
      acc[navalha.tamanho] = qtdPares[navalha.tamanho]! / navalha.consumo;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    nav1: {
      tipo: navalha1.at(0)!.tipo,
      consumo: consumoPorNumNav1,
    },
    nav2: {
      tipo: navalha2.at(0)!.tipo,
      consumo: consumoPorNumNav2,
    },
  };
}
// ==================================================================================================================================================================
/**
 * Função que retorna a divisão de tonalidades
 *
 * @param {ReservaDeTom[]} reservaDeTons - Array com a quantidade reservado de tons pelo programa
 * @param {consumoPorNavalha} consumoPorNavalha - Objeto com as informações de consumo de cada navalha
 * @returns
 */
export function getDivisaoDeTonalidades(
  reservaDeTons: ReservaDeTom[],
  consumoPorNavalha: consumoPorNavalha,
): tonalidade[] {
  // Reserva de tons ordenadas da maior reserva até menor reserva
  const reservasOrdenadas = [...reservaDeTons].sort(
    (a, b) => b.reserva - a.reserva,
  );

  const consumosCombinados = Object.entries(
    consumoPorNavalha.nav1.consumo,
  ).reduce(
    (acc, [chave, valor]) => {
      acc[chave] = valor + (consumoPorNavalha.nav2.consumo[chave] ?? 0);
      return acc;
    },
    {} as Record<string, number>,
  );

  const divisaoDeTonalidades: tonalidade[] = [];

  let indiceReserva = 0;

  //Cria um objeto de tonalidade ja considerando a tonalidade de maior reserva
  let tonalidadeAtual: tonalidade = {
    tom: reservasOrdenadas[0]!.tom,
    reserva: 0,
    tamanhos: [],
  };

  let reservaRestante = reservasOrdenadas[0]!.reserva;

  for (const [tamanho, consumosSomado] of Object.entries(consumosCombinados)) {
    // se o consumo somado não cabe na tonalidade atual
    if (consumosSomado > reservaRestante) {
      divisaoDeTonalidades.push(tonalidadeAtual);

      indiceReserva++;

      if (indiceReserva >= reservasOrdenadas.length) {
        throw new Error(
          `Sem reserva suficiente para alocar o tamanho ${tamanho}`,
        );
      }

      // definindo a nova tonalidade atual
      tonalidadeAtual = {
        tom: reservasOrdenadas[indiceReserva]!.tom,
        reserva: 0,
        tamanhos: [],
      };

      reservaRestante = reservasOrdenadas[indiceReserva]!.reserva;
    }

    tonalidadeAtual.tamanhos.push(tamanho);
    tonalidadeAtual.reserva += consumosSomado;
    reservaRestante -= consumosSomado;
  }

  divisaoDeTonalidades.push(tonalidadeAtual);

  return divisaoDeTonalidades;
}
