export enum tipoNavalha {
  LINGUETA = "LINGUETA",
  CABEDAL = "CABEDAL",
  GASPEA_INT = "GÁSPEA INTERNA",
  GASPEA_EXT = "GÁSPEA EXTERNA",
}

export type navalha = {
  tipo: tipoNavalha;
  tamanho: string;
  medida: {
    largura1: number;
    largura2: number;
    comprimento: number;
  };
};

export enum ton {
  ton1 = "TONALIDADE 1",
  ton2 = "TONALIDADE 2",
  ton3 = "TONALIDADE 3",
  ton4 = "TONALIDADE 4",
  tonP = "TONALIDADE P",
}

export type tonalidade = {
  ton: ton;
  tipo: tipoNavalha;
  reserva: number;
  tamanhos: string[];
};
