import { navsGaspeaExt, navsGaspeaInt } from "./data/navalha.data.js";
import { tom, type ReservaDeTom } from "./data/navalhas.model.js";
import { getConsumoDasNavalhas, getDivisaoDeTonalidades } from "./utils/consumo.utils.js";

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

const reservaDeTons: ReservaDeTom[] = [
  {
    tom: tom.ton2,
    reserva: 24.7,
  },
  {
    tom: tom.tonP,
    reserva: 9.99,
  },
  {
    tom: tom.ton1,
    reserva: 40.8,
  },
];


const consumoDasGaspeas = getConsumoDasNavalhas(
  nav1GaspeaInt,
  nav2GaspeaExt,
  paresPorGrade,
);
getDivisaoDeTonalidades(reservaDeTons, consumoDasGaspeas);
