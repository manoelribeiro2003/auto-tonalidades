import type { tipoNavalha } from "../enums/tipoNavalha.enum.js";

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