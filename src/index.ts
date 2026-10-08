import { navsCabedal, navsLingueta } from "./navalha.data.js";
import type { navalha } from "./navalhas.model.js";
import { get_batidas } from "./navalhas.utils.js";

const LARGURA_MESA: number = 143;

function get_larguras_e_batidas(navalhas: navalha[]) {
  const tamanhos = navalhas.map((nav) => nav.tamanho);

  tamanhos.forEach((tam) => {
    const navalha = navalhas.find((nav) => nav.tamanho == tam)!;

    console.log(`
        tamanho: ${tam}
        tipo: ${navalha.tipo}
        batidas: ${get_batidas(navalha, LARGURA_MESA).batidas}
        largura total: ${get_batidas(navalha, LARGURA_MESA).largura_total}
        `);
  });
}
console.log("-----------------------------------------------------------");
get_larguras_e_batidas(navsLingueta);
console.log("-----------------------------------------------------------");
get_larguras_e_batidas(navsCabedal);
console.log("-----------------------------------------------------------");
