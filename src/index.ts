import { navsCabedal } from "./data/mocks/cabedal.js";
import { navsGaspeaExt } from "./data/mocks/gaspeaExterna.js";
import { navsGaspeaInt } from "./data/mocks/gaspeaInterna.js";
import { tom } from "./data/models/enums/tom.enum.js";
import type { navalha } from "./data/models/types/navalha.type.js";
import type { ReservaDeTom } from "./data/models/types/reservaDeTom.type.js";
import type { tonalidade } from "./data/models/types/tonalidade.type.js";
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
import { sequenciaDeBatidas } from "./utils/otimizacao.js";

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
// escreverArquivo(
//   "txt",
//   melhoresBatidasGaspeaExt.logs,
//   "melhoresBatidasGaspeaExt",
// );
// escreverArquivo(
//   "json",
//   melhoresBatidasGaspeaExt.todasCombinacoesDeBatidas,
//   "melhoresBatidasGaspeaExt",
// );
// ===========================================================================================================================

/*function sequenciaDeBatidas(
  navalhas: navalha[],
  melhoresBatidas: melhores_batidas,
) {
  const combinacoesDeBatidas = melhoresBatidas.todasCombinacoesDeBatidas;

  const batidas: batidas_combinadas[] = [];
  const tamAlocados: string[] = [];

  for (const [_, batidas_combinadas] of Object.entries(combinacoesDeBatidas)) {
    for (const batida_combinada of batidas_combinadas) {
      const incluiNav1 = tamAlocados.includes(batida_combinada.tamanho_nav1);
      const incluiNav2 = tamAlocados.includes(batida_combinada.tamanho_nav2);
      const qtdBatNav1 = batida_combinada.qtd_batidas_nav1;
      const qtdBatNav2 = batida_combinada.qtd_batidas_nav2;

      if (incluiNav1 && incluiNav2) {
        continue;
      } else if (incluiNav1 || incluiNav2) {
        if (incluiNav1 && qtdBatNav1 !== 0) continue;
        if (incluiNav2 && qtdBatNav2 !== 0) continue;
      }

      batidas.push(batida_combinada);

      if (batida_combinada.qtd_batidas_nav1 !== 0) {
        tamAlocados.push(batida_combinada.tamanho_nav1);
        console.log("tamanho inserido: ", batida_combinada.tamanho_nav1);
      }
      if (batida_combinada.qtd_batidas_nav2 !== 0) {
        tamAlocados.push(batida_combinada.tamanho_nav2);
        console.log("tamanho inserido: ", batida_combinada.tamanho_nav2);
      }
    }
  }

  return batidas;
}
*/

const sequenciaGaspeaInt = sequenciaDeBatidas(
  nav1GaspeaInt,
  mel_bat_gasp_int_divididas,
);

escreverArquivo("json", sequenciaGaspeaInt, "sequenciaGaspeaInt");
