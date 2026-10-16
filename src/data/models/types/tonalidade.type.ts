import type { tom } from "../enums/tom.enum.js";

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