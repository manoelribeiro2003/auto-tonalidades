import { navsCabedal } from "./data/mocks/cabedal.js";
import { navsGaspeaExt } from "./data/mocks/gaspeaExterna.js";
import { navsGaspeaInt } from "./data/mocks/gaspeaInterna.js";
import { tom } from "./data/models/enums/tom.enum.js";
import type { navalha } from "./data/models/types/navalha.type.js";
import type { ReservaDeTom } from "./data/models/types/reservaDeTom.type.js";
import type { tonalidade } from "./data/models/types/tonalidade.type.js";
import { executarConversacao } from "./interacao/interacao.js";
import { escreverArquivo } from "./utils/arquivo.utils.js";
import {
  getMelhoresBatidas,
  type batidas_combinadas,
  type melhores_batidas,
} from "./utils/batidas_e_larguras.utils.js";
import {
  getConsumoDasNavalhas,
  getDivisaoDeTonalidades,
  type novoConsumoDasNavalhas,
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

// ===========================================================================================================================
const consumoDasGaspeas = getConsumoDasNavalhas(
  [nav1GaspeaInt, nav2GaspeaExt],
  paresPorGrade,
);
escreverArquivo("json", consumoDasGaspeas, "consumoDasGaspeas");
// ===========================================================================================================================
const divTonalidadesGaspeas = getDivisaoDeTonalidades(
  reservaDeTons,
  consumoDasGaspeas,
);
escreverArquivo("json", divTonalidadesGaspeas, "divTonalidadesGaspeas");
// ===========================================================================================================================
const mel_bat_gasp_int_divididas = getMelhoresBatidas(
  nav1GaspeaInt,
  LARGURA_MESA.gaspea_interna,
  divTonalidadesGaspeas,
);
escreverArquivo(
  "txt",
  mel_bat_gasp_int_divididas.logs,
  "melhoresBatidasGaspeaInt",
);
escreverArquivo(
  "json",
  mel_bat_gasp_int_divididas.todasCombinacoesDeBatidas,
  "melhoresBatidasGaspeaInt",
);
// ===========================================================================================================================
const melhoresBatidasGaspeaExt = getMelhoresBatidas(
  nav2GaspeaExt,
  LARGURA_MESA.gaspea_externa,
  divTonalidadesGaspeas,
);

executarConversacao().catch((erro: unknown) => {
  console.error("Erro durante a execução:", erro);
  process.exitCode = 1;
});