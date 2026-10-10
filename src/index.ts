import {
  tipoNavalha,
  ton,
  type navalha,
  type tonalidade,
} from "./navalhas.model.js";
import { navsGaspeaInt, navsLingueta } from "./navalha.data.js";
import {
  get_larguras_e_batidas_combinadas,
  type batidas_combinadas,
} from "./navalhas.utils.js";
import { writeFileSync } from "node:fs";

const NUM_BATIDAS_RANGE_MAX = Array.from({ length: 20 }, (_, index) => index);
const LARGURA_MESA = 143;
const navalhas = navsGaspeaInt;

const tonalidades: tonalidade[] = [
  {
    ton: ton.ton1,
    tipo: tipoNavalha.GASPEA_INT,
    reserva: 40.8,
    tamanhos: ["334", "35", "36", "378", "39", "40", "41", "42"],
  },
  {
    ton: ton.tonP,
    tipo: tipoNavalha.GASPEA_INT,
    reserva: 9.99,
    tamanhos: ["434", "45"],
  },
  // {
  //   ton: ton.ton1,
  //   tipo: tipoNavalha.GASPEA_INT,
  //   reserva: 40.8,
  //   tamanhos: ["334", "35", "36", "378", "39", "40", "41", "42", "434", "45"],
  // },
];

const logs: string[] = [];

navalhas.forEach((nav1) => {
  logs.push(
    "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
  );

  const tonalidadeNav1 = tonalidades.find((ton) =>
    ton.tamanhos.includes(nav1.tamanho),
  )?.ton;

  navalhas.forEach((nav2) => {
    const tonalidadeNav2 = tonalidades.find((ton) =>
      ton.tamanhos.includes(nav2.tamanho),
    )?.ton;

    if (nav1.tamanho === nav2.tamanho || tonalidadeNav1 !== tonalidadeNav2) {
      return;
    }

    NUM_BATIDAS_RANGE_MAX.forEach((num) => {
      const resultado = get_larguras_e_batidas_combinadas(
        nav1,
        nav2,
        num,
        LARGURA_MESA,
      );

      if (resultado.largura_total > LARGURA_MESA) {
        return;
      }

      logs.push(JSON.stringify(resultado));
    });

    logs.push("");
  });
});

writeFileSync("resultado.txt", logs.join("\n"), "utf8");
