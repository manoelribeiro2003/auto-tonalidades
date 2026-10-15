/**
 * Enum para informar quais os tons que existem
 */
export enum tom {
  ton1 = "TONALIDADE 1",
  ton2 = "TONALIDADE 2",
  ton3 = "TONALIDADE 3",
  ton4 = "TONALIDADE 4",
  tonP = "TONALIDADE P",
}

/**
 * Enum para informar quais os tipos de navalhas que existem
 */
export enum tipoNavalha {
  LINGUETA = "LINGUETA",
  CABEDAL = "CABEDAL",
  GASPEA_INT = "GÁSPEA INTERNA",
  GASPEA_EXT = "GÁSPEA EXTERNA",
}

/**
 * Tipo para informar as propriedades de um objeto navalha
 */
export type navalha = {
  tipo: tipoNavalha;
  tamanho: string;
  consumo: number;
  medida: {
    largura1: number;
    largura2: number;
    comprimento: number;
  };
};

/**
 * Tipo para informar as propriedades de um objeto de divisão de tonalidade, 
 * onde a propridade 'tom' se refere a cor, 'reserva' se refere a quantidade em metros que a divisão retornou e 
 * 'tamanhos' se refere aos tamanhos que foram dividos
 */
export type tonalidade = {
  tom: tom;
  reserva: number;
  tamanhos: string[];
};

/**
 * Tipo para informar as propriedades de um objeto de reserva de tonalidade, 
 * onde a propriedade tom se refere a cor e reserva a quantidade reservada em metros
 */
export type ReservaDeTom = {
  tom: tom;
  reserva: number;
};


