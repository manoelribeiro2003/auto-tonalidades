import {
  navsCabedal,
  navsGaspeaExt,
  navsGaspeaInt,
} from "./data/navalha.data.js";
import { tom, type ReservaDeTom } from "./data/navalhas.model.js";
import { escreverArquivo } from "./utils/arquivo.utils.js";
import { getMelhoresBatidas } from "./utils/batidas_e_larguras.utils.js";
import {
  getNovoConsumoDasNavalhas,
  getConsumoDasNavalhas,
  getDivisaoDeTonalidades,
  getNovaDivisaoDeTonalidades,
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

const consumoDasGaspeas = getConsumoDasNavalhas(
  nav1GaspeaInt,
  nav2GaspeaExt,
  paresPorGrade,
);

const divTonalidadesGaspeas = getDivisaoDeTonalidades(
  reservaDeTons,
  consumoDasGaspeas,
);

const melhoresBatidasGaspeaInt = getMelhoresBatidas(
  nav1GaspeaInt,
  LARGURA_MESA.cabedal,
  divTonalidadesGaspeas,
);

// escreverArquivo("json", consumoDasGaspeas, "consumoDasGaspeas");
// escreverArquivo("json", divTonalidadesGaspeas, "divTonalidadesGaspeas");
// escreverArquivo("json", melhoresBatidasGaspeaInt, "melhoresBatidasGaspeaInt");
// escreverArquivo(
//   "txt",
//   melhoresBatidasGaspeaInt.logs,
//   "melhoresBatidasGaspeaInt",
// );
const novoConsumoDasNavalhas = getNovoConsumoDasNavalhas(
  [nav1GaspeaInt, nav2GaspeaExt],
  paresPorGrade,
);

console.log("novoConsumoDasNavalhas: ", novoConsumoDasNavalhas);

console.log(
  "getNovaDivisaoDeTonalidades",
  getNovaDivisaoDeTonalidades(reservaDeTons, novoConsumoDasNavalhas),
);
