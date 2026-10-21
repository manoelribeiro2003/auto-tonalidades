import chalk from "chalk";
import Table from "cli-table3";

import type { batidas_combinadas } from "../utils/batidas_e_larguras.utils.js";

const combinacoes: batidas_combinadas[] = batidasGaspeaInt[334];

const tabela = new Table({
  head: [
    "Opção",
    "Navalha 1",
    "Navalha 2",
    "Batidas N1",
    "Batidas N2",
    "Largura total",
  ],
  colAligns: ["center", "center", "center", "center", "center", "right"],
});

for (const [indice, item] of combinacoes.entries()) {
  const larguraFormatada = item.largura_total.toFixed(2);

  const larguraColorida =
    item.largura_total >= 124
      ? chalk.green(larguraFormatada)
      : chalk.red(larguraFormatada);

  tabela.push([
    indice + 1,
    item.tamanho_nav1,
    item.tamanho_nav2,
    item.qtd_batidas_nav1,
    item.qtd_batidas_nav2,
    larguraColorida,
  ]);
}

console.log(tabela.toString());
