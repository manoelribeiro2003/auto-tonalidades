import {
  ton,
  type consumos,
  type navalha,
  type ReservaTon,
  type tonalidade,
} from "./navalhas.model.js";
import {
  navsCabedal,
  navsGaspeaExt,
  navsGaspeaInt,
  navsLingueta,
} from "./navalha.data.js";
import {
  escreverArquivo,
  get_consumo,
  melhores_batidas,
} from "./navalhas.utils.js";
import { writeFileSync } from "node:fs";

const NUM_BATIDAS_RANGE_MAX = Array.from({ length: 20 }, (_, index) => index);

const larguraMesa = {
  cabedal: 142,
  lingueta: 143,
  gaspea_interna: 139,
  gaspea_externa: 139,
};

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

const melhoresBatidasCabedal = melhores_batidas(
  navsCabedal,
  larguraMesa.cabedal,
  NUM_BATIDAS_RANGE_MAX,
  tonalidadesGaspeaInterna,
);

const melhoresBatidasLingueta = melhores_batidas(
  navsLingueta,
  larguraMesa.lingueta,
  NUM_BATIDAS_RANGE_MAX,
  tonalidadesGaspeaExterna,
);
const melhoresBatidasGaspeaInterna = melhores_batidas(
  navsGaspeaInt,
  larguraMesa.gaspea_interna,
  NUM_BATIDAS_RANGE_MAX,
  tonalidadesGaspeaInterna,
);

const melhoresBatidasGaspeaExterna = melhores_batidas(
  navsGaspeaExt,
  larguraMesa.gaspea_externa,
  NUM_BATIDAS_RANGE_MAX,
  tonalidadesGaspeaExterna,
);

const consumos = get_consumo(navsGaspeaInt, navsGaspeaExt, paresPorGrade);
writeFileSync(
  "saidas/consulmos.json",
  JSON.stringify(consumos, null, 2),
  "utf-8",
);

escreverArquivo("json", melhoresBatidasCabedal, "melhoresBatidasCabedal");

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



console.log(dividirTonalidades(reservaDeTons, consumos));
