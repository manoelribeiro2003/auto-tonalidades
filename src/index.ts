import { navsGaspeaExt, navsGaspeaInt } from "./navalha.data.js";
import { ton, type ReservaTon } from "./navalhas.model.js";
import {
  getConsumoDasNavalhas,
  getDivisaoDeTonalidades,
} from "./navalhas.utils.js";

const LARGURA_MESA = {
  cabedal: 142,
  lingueta: 143,
  gaspea_interna: 139,
  gaspea_externa: 139,
};

const nav1GaspeaInt = [...navsGaspeaInt];
const nav2GaspeaExt = [...navsGaspeaExt];



const paresPorGrade: Record<string, number> = {
  "334": 43,
  "35": 55,
  "36": 60,
  "378": 60,
  "39": 69,
  "40": 63,
  "41": 105,
  "42": 97,
  "434": 53,
  "45": 44,
};

const consumoDasGaspeas = getConsumoDasNavalhas(
  nav1GaspeaInt,
  nav2GaspeaExt,
  paresPorGrade,
);



const reservaDeTons: ReservaTon[] = [
  {
    ton: ton.ton2,
    reserva: 24.7,
  },
  {
    ton: ton.tonP,
    reserva: 9.99,
  },
  {
    ton: ton.ton1,
    reserva: 40.8,
  },
];

getDivisaoDeTonalidades(reservaDeTons, consumoDasGaspeas)