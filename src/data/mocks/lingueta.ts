import { tipoNavalha } from "../models/enums/tipoNavalha.enum.js";
import type { navalha } from "../models/types/navalha.type.js";

export const navsLingueta: navalha[] = [
  {
    tipo: tipoNavalha.LINGUETA,
    tamanho: "334",
    medida: {
      largura1: 17.42,
      largura2: 16.62,
      comprimento: 13.23,
    },
    consumo: 58.26,
  },
  {
    tipo: tipoNavalha.LINGUETA,
    tamanho: "356",
    medida: {
      largura1: 17.73,
      largura2: 16.9,
      comprimento: 13.58,
    },
    consumo: 53.76,
  },
  {
    tipo: tipoNavalha.LINGUETA,
    tamanho: "378",
    medida: {
      largura1: 18.33,
      largura2: 17.44,
      comprimento: 14.28,
    },
    consumo: 51.26,
  },
  {
    tipo: tipoNavalha.LINGUETA,
    tamanho: "394",
    medida: {
      largura1: 19,
      largura2: 18.12,
      comprimento: 14.94,
    },
    consumo: 47.57,
  },
];