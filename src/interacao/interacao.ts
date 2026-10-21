import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

type arquivosUsados = Record<string, string>;

const terminal = createInterface({
  input: stdin,
  output: stdout,
});

async function perguntar(mensagem: string, opcoes?: string[]): Promise<string> {
  while (true) {
    let resposta: string = await terminal.question(`${mensagem} `);

    resposta = resposta.trim().toLowerCase();

    if (!opcoes) {
      if (["sim", "s", "não", "nao", "n"].includes(resposta)) return resposta;
    } else {
      if (opcoes.includes(resposta)) return resposta;
    }

    if (!opcoes) {
      console.log("Responda com sim ou não.\n");
    } else {
      console.log(`Responda com uma das opções: ${opcoes.join(", ")}\n`);
    }
  }
}

function confirmou(resposta: string, opcoes?: string[]): boolean {
  if (opcoes) {
    return opcoes.includes(resposta);
  } else {
    return ["sim", "s"].includes(resposta);
  }
}

export async function executarConversacao(): Promise<void> {
  console.log("\n=== AUTO TONALIDADES ===\n");

  try {
    // Primeira etapa
    const carregarNavalhas = await perguntar(
      "Quais navalhas carregar? (gaspeas/lingueta)",
      ["gaspeas", "lingueta"],
    );

    if (confirmou(carregarNavalhas, ["gaspeas", "lingueta"])) {
      console.log("\nCarregando dados das navalhas...");
      // Chame aqui a função responsável por carregar as navalhas.
    }

    // Segunda etapa
    const carregarConsumos = await perguntar(
      "\nDeseja carregar os consumos? (sim/não)",
    );

    if (confirmou(carregarConsumos)) {
      console.log("\nCarregando consumos...");
      // Chame aqui a função responsável por carregar os consumos.
    }

    // Exibe um resultado e pergunta se deve continuar.
    while (true) {
      console.log("\n=== RESUMO ===");
      console.log("Dados das navalhas e consumos disponíveis.");
      console.log("Aqui você pode exibir tabelas, cálculos ou opções.");

      const continuar = await perguntar("\nDeseja continuar? (sim/não)");

      if (!confirmou(continuar)) {
        console.log("\nConversação encerrada.");
        break;
      }

      // Próxima etapa
      const gerarCombinacoes = await perguntar(
        "\nDeseja gerar as combinações de batidas? (sim/não)",
      );

      if (confirmou(gerarCombinacoes)) {
        console.log("\nGerando combinações de batidas...");
        // Chame aqui a função que gera as combinações.
      }

      // O laço volta ao resumo e pergunta se deseja continuar.
    }
  } finally {
    terminal.close();
  }
}

executarConversacao().catch((erro: unknown) => {
  console.error("Erro durante a execução:", erro);
  process.exitCode = 1;
});
