import { type navalha } from "./navalhas.model.js";
import { navsLingueta, navsGaspea, navsCabedal } from "./navalha.data.js";
import {
  get_larguras_e_batidas_combinadas,
  type batidas_combinadas,
} from "./navalhas.utils.js";

const NUM_BATIDAS_RANGE_MAX = Array.from({ length: 20 }, (_, index) => index);

const nav_1 = navsCabedal.find((nav) => nav.tamanho == "35")!;
const nav_2 = navsCabedal.find((nav) => nav.tamanho == "40")!;
const LARGURA_MESA = 128;

const bat_comb_para_nav1: batidas_combinadas[] = [];
const bat_comb_para_nav2: batidas_combinadas[] = [];

NUM_BATIDAS_RANGE_MAX.forEach((num) => {
  const result1 = get_larguras_e_batidas_combinadas(
    nav_1,
    nav_2,
    num,
    LARGURA_MESA,
  );
  const result2 = get_larguras_e_batidas_combinadas(
    nav_2,
    nav_1,
    num,
    LARGURA_MESA,
  );
  bat_comb_para_nav1.push(result1);
  bat_comb_para_nav2.push(result2);
});

const ordenado1 = bat_comb_para_nav1
  .sort((a, b) => b.largura_total - a.largura_total)
  .filter((item) => item.largura_total <= LARGURA_MESA);
const ordenado2 = bat_comb_para_nav2
  .sort((a, b) => b.largura_total - a.largura_total)
  .filter((item) => item.largura_total <= LARGURA_MESA);

console.log("---------------------------------------------------------");
console.log(ordenado1);
console.log("---------------------------------------------------------");
console.log(ordenado2);
console.log("---------------------------------------------------------");
