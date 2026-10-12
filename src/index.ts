import { writeFileSync } from "node:fs";
import { ton, type tonalidade } from "./navalhas.model.js";
import {
  navsCabedal,
  navsGaspeaExt,
  navsGaspeaInt,
  navsLingueta,
} from "./navalha.data.js";
import { melhores_batidas } from "./navalhas.utils.js";

const NUM_BATIDAS_RANGE_MAX = Array.from({ length: 20 }, (_, index) => index);

const LARGURA_MESA = 139;

const tonalidadesGaspeaInterna: tonalidade[] = [
  {
    ton: ton.ton1,
    tipo: navsGaspeaInt[0]?.tipo!,
    reserva: 40.8,
    tamanhos: ["334", "35", "36", "378", "39", "40", "41", "42"],
  },
  {
    ton: ton.tonP,
    tipo: navsGaspeaInt[0]?.tipo!,
    reserva: 40.8,
    tamanhos: ["434", "45"],
  },
];
const tonalidadesGaspeaExterna: tonalidade[] = [
  {
    ton: ton.ton1,
    tipo: navsGaspeaExt[0]?.tipo!,
    reserva: 40.8,
    tamanhos: ["334", "35", "36", "378", "39", "40", "41", "42"],
  },
  {
    ton: ton.tonP,
    tipo: navsGaspeaExt[0]?.tipo!,
    reserva: 40.8,
    tamanhos: ["434", "45"],
  },
];

const qtd_pares: Record<string, number> = {
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

const melhoresBatidasGaspeaInterna = melhores_batidas(
  navsGaspeaInt,
  LARGURA_MESA,
  NUM_BATIDAS_RANGE_MAX,
  tonalidadesGaspeaInterna,
);
const melhoresBatidasGaspeaExterna = melhores_batidas(
  navsGaspeaExt,
  LARGURA_MESA,
  NUM_BATIDAS_RANGE_MAX,
  tonalidadesGaspeaExterna,
);
const consumoPorNum = navsGaspeaInt.reduce(
  (acc, navalha) => {
    acc[navalha.tamanho] = qtd_pares[navalha.tamanho]! / navalha.consumo;
    return acc;
  },
  {} as Record<string, number>,
);

writeFileSync(
  "saidas/json/resultadogaspeaInterna.json",
  JSON.stringify(melhoresBatidasGaspeaInterna.melhoresBatidasPorNum, null, 2),
  "utf8",
);
writeFileSync(
  "saidas/txt/resultadogaspeaInterna.txt",
  melhoresBatidasGaspeaInterna.logs,
  "utf8",
);

writeFileSync(
  "saidas/json/resultadogaspeaExterna.json",
  JSON.stringify(melhoresBatidasGaspeaExterna.melhoresBatidasPorNum, null, 2),
  "utf8",
);
writeFileSync(
  "saidas/txt/resultadogaspeaExterna.txt",
  melhoresBatidasGaspeaExterna.logs,
  "utf8",
);

writeFileSync(
  "saidas/json/consumoPorNum.json",
  JSON.stringify(consumoPorNum, null, 2),
  "utf8",
);
