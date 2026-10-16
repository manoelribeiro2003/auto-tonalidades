import { navsCabedal } from "./data/mocks/cabedal.js";
import { navsGaspeaExt } from "./data/mocks/gaspeaExterna.js";
import { navsGaspeaInt } from "./data/mocks/gaspeaInterna.js";
import { navsLingueta } from "./data/mocks/lingueta.js";
import { tom } from "./data/models/enums/tom.enum.js";
import type { ReservaDeTom } from "./data/models/types/reservaDeTom.type.js";
import { escreverArquivo } from "./utils/arquivo.utils.js";
import {
  getLargurasEBatidasCombinadas,
  getMelhoresBatidas,
} from "./utils/batidas_e_larguras.utils.js";
import {
  getConsumoDasNavalhas,
  getDivisaoDeTonalidades,
} from "./utils/consumo.utils.js";

const LARGURA_MESA = {
  cabedal: 142,
  lingueta: 143,
  gaspea_interna: 139,
  gaspea_externa: 139,
};

const nav1GaspeaInt = [...navsGaspeaInt];
const nav2GaspeaExt = [...navsGaspeaExt];
const nav1Cabedal = [...navsCabedal];

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

const consumoDasGaspeas = getConsumoDasNavalhas( //OK
  [nav1GaspeaInt, nav2GaspeaExt],
  paresPorGrade,
);
// escreverArquivo('json', consumoDasGaspeas, 'consumoDasGaspeas')

const divTonalidadesGaspeas = getDivisaoDeTonalidades(
  reservaDeTons,
  consumoDasGaspeas,
);
escreverArquivo('json', divTonalidadesGaspeas, 'divTonalidadesGaspeas')

const melhoresBatidasGaspeaInt = getMelhoresBatidas(
  nav1GaspeaInt,
  LARGURA_MESA.gaspea_interna,
  divTonalidadesGaspeas,
);

escreverArquivo('txt', melhoresBatidasGaspeaInt.logs, "melhoresBatidasGaspeaInt")

const melhoresBatidasGaspeaExt = getMelhoresBatidas(
  nav2GaspeaExt,
  LARGURA_MESA.gaspea_externa,
  divTonalidadesGaspeas,
);
