export enum tipoNavalha {
  LINGUETA = "LINGUETA",
  CABEDAL = "CABEDAL",
}

export type navalha = {
  tipo: tipoNavalha.CABEDAL | tipoNavalha.LINGUETA;
  tamanho: string;
  medida: {
    largura1: number;
    largura2: number;
    comprimento: number;
  };
};
