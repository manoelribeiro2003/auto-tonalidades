import { tipoNavalha } from "../models/enums/tipoNavalha.enum.js";
import type { navalha } from "../models/types/navalha.type.js";

export const navsCabedal: navalha[] = [
  {
    tipo: tipoNavalha.CABEDAL,
    tamanho: "334",
    medida: {
      largura1: 19.86,
      largura2: 17.88,
      comprimento: 28.74,
    },
    consumo: 10.98,
  },
  {
    tipo: tipoNavalha.CABEDAL,
    tamanho: "35",
    medida: {
      largura1: 20.24,
      largura2: 18.17,
      comprimento: 29.55,
    },
    consumo: 10.67,
  },
  {
    tipo: tipoNavalha.CABEDAL,
    tamanho: "36",
    medida: {
      largura1: 20.61,
      largura2: 18.49,
      comprimento: 30.28,
    },
    consumo: 8.95,
  },
  {
    tipo: tipoNavalha.CABEDAL,
    tamanho: "37",
    medida: {
      largura1: 20.98,
      largura2: 18.81,
      comprimento: 31.05,
    },
    consumo: 8.72,
  },
  {
    tipo: tipoNavalha.CABEDAL,
    tamanho: "38",
    medida: {
      largura1: 21.36,
      largura2: 19.13,
      comprimento: 31.82,
    },
    consumo: 8.53,
  },
  {
    tipo: tipoNavalha.CABEDAL,
    tamanho: "39",
    medida: {
      largura1: 21.73,
      largura2: 19.45,
      comprimento: 32.6,
    },
    consumo: 8.33,
  },
  {
    tipo: tipoNavalha.CABEDAL,
    tamanho: "40",
    medida: {
      largura1: 22.1,
      largura2: 19.79,
      comprimento: 33.37,
    },
    consumo: 8.15,
  },
];