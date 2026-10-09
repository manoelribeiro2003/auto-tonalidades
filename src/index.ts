import { type navalha } from "./navalhas.model.js";
import { navsGaspeaInt } from "./navalha.data.js";
import {
  get_larguras_e_batidas_combinadas,
  type batidas_combinadas,
} from "./navalhas.utils.js";

// const NUM_BATIDAS_RANGE_MAX = Array.from({ length: 20 }, (_, index) => index);

// const nav_334 = navsGaspeaInt.find((nav) => nav.tamanho == "334")!;
// const nav_35 = navsGaspeaInt.find((nav) => nav.tamanho == "35")!;
// const nav_36 = navsGaspeaInt.find((nav) => nav.tamanho == "36")!;
// const nav_378 = navsGaspeaInt.find((nav) => nav.tamanho == "378")!;
// const nav_39 = navsGaspeaInt.find((nav) => nav.tamanho == "39")!;
// const nav_40 = navsGaspeaInt.find((nav) => nav.tamanho == "40")!;
// const nav_41 = navsGaspeaInt.find((nav) => nav.tamanho == "41")!;
// const nav_42 = navsGaspeaInt.find((nav) => nav.tamanho == "42")!;
// const nav_434 = navsGaspeaInt.find((nav) => nav.tamanho == "434")!;
// const nav_45 = navsGaspeaInt.find((nav) => nav.tamanho == "45")!;

// const LARGURA_MESA = 139;

// const bat_comb_para_nav334: batidas_combinadas[] = [];
// const bat_comb_para_nav35: batidas_combinadas[] = [];
// const bat_comb_para_nav36: batidas_combinadas[] = [];
// const bat_comb_para_nav378: batidas_combinadas[] = [];
// const bat_comb_para_nav39: batidas_combinadas[] = [];
// const bat_comb_para_nav40: batidas_combinadas[] = [];
// const bat_comb_para_nav41: batidas_combinadas[] = [];
// const bat_comb_para_nav42: batidas_combinadas[] = [];
// const bat_comb_para_nav434: batidas_combinadas[] = [];
// const bat_comb_para_nav45: batidas_combinadas[] = [];

// // --------------------------------------------------------------------------------

// NUM_BATIDAS_RANGE_MAX.forEach((num) => {
//   const result1 = get_larguras_e_batidas_combinadas(
//     nav_334,
//     nav_35,
//     num,
//     LARGURA_MESA,
//   );

//   const result2 = get_larguras_e_batidas_combinadas(
//     nav_35,
//     nav_334,
//     num,
//     LARGURA_MESA,
//   );
//   bat_comb_para_nav334.push(result1);
//   bat_comb_para_nav35.push(result2);
// });

// // --------------------------------------------------------------------------------

// NUM_BATIDAS_RANGE_MAX.forEach((num) => {
//   const result1 = get_larguras_e_batidas_combinadas(
//     nav_36,
//     nav_378,
//     num,
//     LARGURA_MESA,
//   );

//   const result2 = get_larguras_e_batidas_combinadas(
//     nav_378,
//     nav_36,
//     num,
//     LARGURA_MESA,
//   );
//   bat_comb_para_nav36.push(result1);
//   bat_comb_para_nav378.push(result2);
// });

// // --------------------------------------------------------------------------------

// NUM_BATIDAS_RANGE_MAX.forEach((num) => {
//   const result1 = get_larguras_e_batidas_combinadas(
//     nav_39,
//     nav_40,
//     num,
//     LARGURA_MESA,
//   );

//   const result2 = get_larguras_e_batidas_combinadas(
//     nav_40,
//     nav_39,
//     num,
//     LARGURA_MESA,
//   );
//   bat_comb_para_nav39.push(result1);
//   bat_comb_para_nav40.push(result2);
// });

// // --------------------------------------------------------------------------------
// NUM_BATIDAS_RANGE_MAX.forEach((num) => {
//   const result1 = get_larguras_e_batidas_combinadas(
//     nav_41,
//     nav_42,
//     num,
//     LARGURA_MESA,
//   );

//   const result2 = get_larguras_e_batidas_combinadas(
//     nav_42,
//     nav_41,
//     num,
//     LARGURA_MESA,
//   );
//   bat_comb_para_nav41.push(result1);
//   bat_comb_para_nav42.push(result2);
// });

// // --------------------------------------------------------------------------------

// const ordenado1 = bat_comb_para_nav334
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);
// const ordenado2 = bat_comb_para_nav35
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);
// const ordenado3 = bat_comb_para_nav36
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);
// const ordenado4 = bat_comb_para_nav378
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);
// const ordenado5 = bat_comb_para_nav39
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);
// const ordenado6 = bat_comb_para_nav40
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);
// const ordenado7 = bat_comb_para_nav41
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);
// const ordenado8 = bat_comb_para_nav42
//   .sort((a, b) => b.largura_total - a.largura_total)
//   .filter((item) => item.largura_total <= LARGURA_MESA);

// console.log("---------------------------------------------------------");
// console.log(ordenado1);
// console.log("---------------------------------------------------------");
// console.log(ordenado2);
// console.log("---------------------------------------------------------");
// console.log(ordenado3);
// console.log("---------------------------------------------------------");
// console.log(ordenado4);
// console.log("---------------------------------------------------------");
// console.log(ordenado5);
// console.log("---------------------------------------------------------");
// console.log(ordenado6);
// console.log("---------------------------------------------------------");
// console.log(ordenado7);
// console.log("---------------------------------------------------------");
// console.log(ordenado8);
// console.log("---------------------------------------------------------");

const NUM_BATIDAS_RANGE_MAX = Array.from({ length: 20 }, (_, index) => index);

const LARGURA_MESA = 139;

const TAMANHOS_DESEJADOS = [
  "334",
  "35",
  "36",
  "378",
  "39",
  "40",
  "41",
  "42",
  "434",
  "45",
];

const navs = navsGaspeaInt.filter((nav) =>
  TAMANHOS_DESEJADOS.includes(nav.tamanho),
);

const batidasPorNavalha: Record<string, batidas_combinadas[]> = {};

// inicializa os arrays
for (const nav of navs) {
  batidasPorNavalha[nav.tamanho] = [];
}

// gera todas as combinações possíveis
for (const navPrincipal of navs) {
  for (const navSecundaria of navs) {
    // não combina consigo mesma
    if (navPrincipal.tamanho === navSecundaria.tamanho) {
      continue;
    }

    for (const numBatidas of NUM_BATIDAS_RANGE_MAX) {
      const resultado = get_larguras_e_batidas_combinadas(
        navPrincipal,
        navSecundaria,
        numBatidas,
        LARGURA_MESA,
      );

      batidasPorNavalha[navPrincipal.tamanho]!.push(resultado);
    }
  }
}

// ordena os resultados
const ordenados: Record<string, batidas_combinadas[]> = {};

for (const [tamanho, resultados] of Object.entries(batidasPorNavalha)) {
  ordenados[tamanho] = resultados
    .filter((item) => item.largura_total <= LARGURA_MESA)
    .sort((a, b) => b.largura_total - a.largura_total);
}

// imprime tudo
for (const [tamanho, resultados] of Object.entries(ordenados)) {
  console.log("---------------------------------------------------------");
  console.log(`NAVALHA ${tamanho}`);
  console.log(resultados);
}

console.log("---------------------------------------------------------");
