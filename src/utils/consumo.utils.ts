import type {
  navalha,
  ReservaDeTom,
  tipoNavalha,
  tonalidade,
} from "../data/models/navalhas.model.js";

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
  navalha1: navalha[],
  navalha2: navalha[],
  qtdPares: Record<string, number>,
): consumoDasNavalhas {
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

export function getNovoConsumoDasNavalhas(
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
  consumoDasNavalhas: consumoDasNavalhas,
): tonalidade[] {
  // Reserva de tons ordenadas da maior reserva até menor reserva
  const reservasOrdenadas = [...reservasDeTons].sort(
    (a, b) => b.reserva - a.reserva,
  );

  const consumosCombinados = Object.entries(
    consumoDasNavalhas.nav1.consumo,
  ).reduce(
    (acc, [chave, valor]) => {
      acc[chave] = valor + (consumoDasNavalhas.nav2.consumo[chave] ?? 0);
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

export function getNovaDivisaoDeTonalidades(
  reservasDeTons: ReservaDeTom[],
  consumosDasNavalhas: novoConsumoDasNavalhas[],
): tonalidade[] {
  // Reserva de tons ordenadas da maior reserva até a menor
  const reservasOrdenadas = [...reservasDeTons].sort(
    (a, b) => b.reserva - a.reserva,
  );

  // Combina os consumos de todas as navalhas por tamanho
  const consumosCombinados = consumosDasNavalhas.reduce(
    (acc, navalha) => {
      for (const [tamanho, consumo] of Object.entries(navalha.consumo)) {
        acc[tamanho] = (acc[tamanho] ?? 0) + consumo;
      }

      return acc;
    },
    {} as Record<string, number>,
  );

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
