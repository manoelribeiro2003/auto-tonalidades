import type { tipoNavalha } from "../data/models/enums/tipoNavalha.enum.js";
import type { navalha } from "../data/models/types/navalha.type.js";
import type { ReservaDeTom } from "../data/models/types/reservaDeTom.type.js";
import type { tonalidade } from "../data/models/types/tonalidade.type.js";

// ==================================================================================================================================================================
/**
 * Objeto que mostra a informação do consumo para as duas navalhas, onde a propriedade 'tipo' se refere ao tipo da navalha e
 * 'consumo' se refere a um objeto chave-valor do consumo por numeração
 */
export type consumoDasNavalhas = {
  nav1: {
    tipo: tipoNavalha;
    consumo: Record<string, number>;
  };
  nav2: {
    tipo: tipoNavalha;
    consumo: Record<string, number>;
  };
};

export type novoConsumoDasNavalhas = {
  tipo: tipoNavalha;
  consumo: Record<string, number>;
};

/**
 * Função que retorna o consumo por cada navalha de acordo com o quantidade de pares por grade de numeros
 * @param {navalha[]} navalha1 - Array de navalhas 1
 * @param {navalha[]} navalha2 - Array de navalhas 2
 * @param {Record<string, number>} qtdPares - Quantidade de pares por numeração
 */
export function getConsumoDasNavalhas(
  navalhas: navalha[][],
  qtdPares: Record<string, number>,
): novoConsumoDasNavalhas[] {
  return navalhas.map((grupoNavalhas) => {
    const consumo = grupoNavalhas.reduce(
      (acc, navalha) => {
        acc[navalha.tamanho] = qtdPares[navalha.tamanho]! / navalha.consumo;

        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      tipo: grupoNavalhas[0]!.tipo,
      consumo,
    };
  });
}

// ==================================================================================================================================================================
/**
 * Função que retorna a divisão de tonalidades com base nas melhores batidas, reserva de tons e as melhores batidas das duas navalhas
 * @param {ReservaDeTom[]} reservasDeTons Array com a quantidade reservado de tons pelo programa
 * @param {consumoDasNavalhas} consumoDasNavalhas Objeto com as informações de consumo de cada navalha
 * @returns {tonalidade[]} Array com a divisão de tonalidades para cada tipo de navalha
 */
export function getDivisaoDeTonalidades(
  reservasDeTons: ReservaDeTom[],
  consumosDasNavalhas: novoConsumoDasNavalhas[],
): tonalidade[] {
  // Reserva de tons ordenadas da maior reserva até a menor
  const reservasOrdenadas = [...reservasDeTons].sort(
    (a, b) => b.reserva - a.reserva,
  );

  // Combina os consumos de todas as navalhas por tamanho
  const consumosCombinados = consumosDasNavalhas.reduce((acc, navalha) => {
    for (const [tamanho, consumo] of Object.entries(navalha.consumo)) {
      acc.set(tamanho, (acc.get(tamanho) ?? 0) + consumo);
    }

    return acc;
  }, new Map<string, number>());

  console.log("consumosCombinados:", consumosCombinados);

  const divisaoDeTonalidades: tonalidade[] = [];

  if (reservasOrdenadas.length === 0) {
    if (Object.keys(consumosCombinados).length > 0) {
      throw new Error("Não existem reservas de tons disponíveis.");
    }

    return divisaoDeTonalidades;
  }

  let indiceReserva = 0;

  // Cria a tonalidade inicial considerando a maior reserva
  let tonalidadeAtual: tonalidade = {
    tom: reservasOrdenadas[0]!.tom,
    reserva: 0,
    tamanhos: [],
  };

  let reservaRestante = reservasOrdenadas[0]!.reserva;

  for (const [tamanho, consumoSomado] of Object.entries(consumosCombinados)) {
    // Se o consumo não cabe na reserva atual, passa para a próxima
    if (consumoSomado > reservaRestante) {
      if (tonalidadeAtual.tamanhos.length > 0) {
        divisaoDeTonalidades.push(tonalidadeAtual);
      }

      indiceReserva++;

      if (indiceReserva >= reservasOrdenadas.length) {
        throw new Error(
          `Sem reserva suficiente para alocar o tamanho ${tamanho}`,
        );
      }

      tonalidadeAtual = {
        tom: reservasOrdenadas[indiceReserva]!.tom,
        reserva: 0,
        tamanhos: [],
      };

      reservaRestante = reservasOrdenadas[indiceReserva]!.reserva;
    }

    tonalidadeAtual.tamanhos.push(tamanho);
    tonalidadeAtual.reserva += consumoSomado;
    reservaRestante -= consumoSomado;
  }

  if (tonalidadeAtual.tamanhos.length > 0) {
    divisaoDeTonalidades.push(tonalidadeAtual);
  }

  return divisaoDeTonalidades;
}
// export function getDivisaoDeTonalidades(
//   reservasDeTons: ReservaDeTom[],
//   consumosDasNavalhas: novoConsumoDasNavalhas[],
// ): tonalidade[] {
//   // Reserva de tons ordenadas da maior reserva até a menor
//   const reservasOrdenadas = [...reservasDeTons].sort(
//     (a, b) => b.reserva - a.reserva,
//   );

//   // Combina os consumos de todas as navalhas por tamanho
//   const consumosCombinados = consumosDasNavalhas.reduce(
//     (acc, navalha) => {
//       for (const [tamanho, consumo] of Object.entries(navalha.consumo)) {
//         acc[tamanho] = (acc[tamanho] ?? 0) + consumo;
//       }

//       return acc;
//     },
//     {} as Record<string, number>,
//   );

//   console.log('consumosCombinados: ', consumosCombinados);

//   const divisaoDeTonalidades: tonalidade[] = [];

//   if (reservasOrdenadas.length === 0) {
//     if (Object.keys(consumosCombinados).length > 0) {
//       throw new Error("Não existem reservas de tons disponíveis.");
//     }

//     return divisaoDeTonalidades;
//   }

//   let indiceReserva = 0;

//   // Cria a tonalidade inicial considerando a maior reserva
//   let tonalidadeAtual: tonalidade = {
//     tom: reservasOrdenadas[0]!.tom,
//     reserva: 0,
//     tamanhos: [],
//   };

//   let reservaRestante = reservasOrdenadas[0]!.reserva;

//   for (const [tamanho, consumoSomado] of Object.entries(consumosCombinados)) {
//     // Se o consumo não cabe na reserva atual, passa para a próxima
//     if (consumoSomado > reservaRestante) {
//       if (tonalidadeAtual.tamanhos.length > 0) {
//         divisaoDeTonalidades.push(tonalidadeAtual);
//       }

//       indiceReserva++;

//       if (indiceReserva >= reservasOrdenadas.length) {
//         throw new Error(
//           `Sem reserva suficiente para alocar o tamanho ${tamanho}`,
//         );
//       }

//       tonalidadeAtual = {
//         tom: reservasOrdenadas[indiceReserva]!.tom,
//         reserva: 0,
//         tamanhos: [],
//       };

//       reservaRestante = reservasOrdenadas[indiceReserva]!.reserva;
//     }

//     tonalidadeAtual.tamanhos.push(tamanho);
//     tonalidadeAtual.reserva += consumoSomado;
//     reservaRestante -= consumoSomado;
//   }

//   if (tonalidadeAtual.tamanhos.length > 0) {
//     divisaoDeTonalidades.push(tonalidadeAtual);
//   }

//   return divisaoDeTonalidades;
// }
