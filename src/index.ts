import { type navalha } from "./navalhas.model.js";
import { navsLingueta } from "./navalha.data.js";
import { get_largura_e_batidas } from "./navalhas.utils.js";

const LARGURA_MESA = 143;

const nav_ling_334 = navsLingueta.find((nav) => nav.tamanho == "334")!;
const nav_ling_356 = navsLingueta.find((nav) => nav.tamanho == "356")!;

function get_larguras_e_batidas_combinadas(
  navalha1: navalha,
  navalha2: navalha,
  qtd_bat_nav1: number,
  largura_mesa: number,
) {
  let larg_qtd_batidas_nav_1 =
    qtd_bat_nav1 == 1
      ? navalha1.medida.largura1
      : navalha1.medida.largura1 +
        navalha1.medida.largura2 * (qtd_bat_nav1 - 1);

  let larg_disp_para_nav2 = largura_mesa - larg_qtd_batidas_nav_1;

  const result_nav2 = get_largura_e_batidas(
    navalha2,
    larg_disp_para_nav2,
    qtd_bat_nav1 !== 0,
  );

  return {
    tamanho_nav1: navalha1.tamanho,
    tamanho_nav2: navalha2.tamanho,
    largura_mesa: largura_mesa,
    qtd_batidas_nav1: qtd_bat_nav1,
    qtd_batidas_nav2: result_nav2.batidas,
    largura_total: larg_qtd_batidas_nav_1 + result_nav2.largura_total,
  };
}



const result = get_larguras_e_batidas_combinadas(
  nav_ling_334,
  nav_ling_356,
  1,
  LARGURA_MESA,
);

console.log(result);
