export enum tipoNavalha {
  LINGUETA = "LINGUETA",
  CABEDAL = "CABEDAL",
  GASPEA_INT = 'GÁSPEA INTERNA',
  GASPEA_EXT = 'GÁSPEA EXTERNA'
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
