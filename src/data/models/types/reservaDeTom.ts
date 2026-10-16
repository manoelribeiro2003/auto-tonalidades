import type { tom } from "../enums/tom.enum.js";

/**
 * Tipo para informar as propriedades de um objeto de reserva de tonalidade, 
 * onde a propriedade tom se refere a cor e reserva a quantidade reservada em metros
 */
export type ReservaDeTom = {
  tom: tom;
  reserva: number;
};
