import type { navalha } from "../data/models/types/navalha.type.js";
import type {
  batidas_combinadas,
  melhores_batidas,
} from "./batidas_e_larguras.utils.js";

export function sequenciaDeBatidas(
  navalhas: navalha[],
  melhoresBatidas: melhores_batidas,
): batidas_combinadas[] {
  const MARGEM_SEGURANCA = 1;
  const LOG_A_CADA_ESTADOS = 100_000;

  const tamanhosNecessarios = [
    ...new Set(navalhas.map((navalha) => String(navalha.tamanho))),
  ];

  const quantidadeTamanhos = tamanhosNecessarios.length;

  if (quantidadeTamanhos === 0) {
    console.warn("[Batidas] Nenhum tamanho obrigatório informado.");
    return [];
  }

  if (quantidadeTamanhos > 30) {
    throw new Error(
      "Esta implementação utiliza bitmask de 32 bits. " +
        "Para mais de 30 tamanhos, utilize outra representação.",
    );
  }

  const indicePorTamanho = new Map<string, number>(
    tamanhosNecessarios.map((tamanho, indice) => [tamanho, indice]),
  );

  const mascaraCompleta = (1 << quantidadeTamanhos) - 1;

  type Candidato = {
    batida: batidas_combinadas;
    mascara: number;
    largura: number;
  };

  const candidatosPorMascara = new Map<number, Candidato>();

  let descartados = 0;
  let candidatosOriginais = 0;

  // 1. Filtra candidatos e elimina alternativas dominadas.
  for (const combinacoes of Object.values(
    melhoresBatidas.todasCombinacoesDeBatidas,
  )) {
    for (const batida of combinacoes) {
      candidatosOriginais++;

      const {
        tamanho_nav1,
        tamanho_nav2,
        qtd_batidas_nav1,
        qtd_batidas_nav2,
        largura_mesa,
        largura_total,
      } = batida;

      const tamanhosAtivos: string[] = [];

      if (qtd_batidas_nav1 > 0) {
        tamanhosAtivos.push(String(tamanho_nav1));
      }

      if (qtd_batidas_nav2 > 0) {
        tamanhosAtivos.push(String(tamanho_nav2));
      }

      // Uma batida precisa utilizar pelo menos um tamanho.
      if (tamanhosAtivos.length === 0) {
        descartados++;
        continue;
      }

      // O mesmo tamanho não pode ocupar as duas posições ativas.
      if (new Set(tamanhosAtivos).size !== tamanhosAtivos.length) {
        descartados++;
        continue;
      }

      // Todos os tamanhos ativos precisam ser obrigatórios.
      if (tamanhosAtivos.some((tamanho) => !indicePorTamanho.has(tamanho))) {
        descartados++;
        continue;
      }

      // Reserva de pelo menos 1 cm na mesa.
      if (
        !Number.isFinite(largura_total) ||
        !Number.isFinite(largura_mesa) ||
        largura_total > largura_mesa - MARGEM_SEGURANCA
      ) {
        descartados++;
        continue;
      }

      let mascara = 0;

      for (const tamanho of tamanhosAtivos) {
        const indice = indicePorTamanho.get(tamanho)!;
        mascara |= 1 << indice;
      }

      const candidato: Candidato = {
        batida,
        mascara,
        largura: largura_total,
      };

      const existente = candidatosPorMascara.get(mascara);

      // Se cobrem os mesmos tamanhos, a maior largura domina.
      if (!existente || candidato.largura > existente.largura) {
        candidatosPorMascara.set(mascara, candidato);
      }
    }
  }

  const candidatos = [...candidatosPorMascara.values()];

  console.log("[Batidas] Preparação concluída.", {
    tamanhosObrigatorios: quantidadeTamanhos,
    candidatosOriginais,
    candidatosValidos: candidatos.length,
    descartados,
    candidatosDominados: candidatosOriginais - descartados - candidatos.length,
  });

  // 2. Indexa candidatos por cada tamanho que eles cobrem.
  const candidatosPorTamanho: Candidato[][] = Array.from(
    { length: quantidadeTamanhos },
    () => [],
  );

  for (const candidato of candidatos) {
    for (let indice = 0; indice < quantidadeTamanhos; indice++) {
      if ((candidato.mascara & (1 << indice)) !== 0) {
        candidatosPorTamanho[indice]!.push(candidato);
      }
    }
  }

  // Favorece primeiro os tamanhos com menos alternativas.
  const ordemTamanhos = Array.from(
    { length: quantidadeTamanhos },
    (_, indice) => indice,
  ).sort(
    (a, b) => candidatosPorTamanho[a]!.length - candidatosPorTamanho[b]!.length,
  );

  const tamanhosSemCandidatos = ordemTamanhos
    .filter((indice) => candidatosPorTamanho[indice]!.length === 0)
    .map((indice) => tamanhosNecessarios[indice]);

  if (tamanhosSemCandidatos.length > 0) {
    console.error(
      "[Batidas] Não existe candidato para todos os tamanhos.",
      tamanhosSemCandidatos,
    );
    return [];
  }

  // 3. Programação dinâmica com memoização.
  // A chave é a máscara dos tamanhos já cobertos.
  const memo = new Map<number, number>();
  const melhorEscolha = new Map<number, Candidato>();

  let estadosCalculados = 0;
  let solucoesImpossiveis = 0;

  function resolver(mascaraAtual: number): number {
    if (mascaraAtual === mascaraCompleta) {
      return 0;
    }

    const resultadoMemorizado = memo.get(mascaraAtual);

    if (resultadoMemorizado !== undefined) {
      return resultadoMemorizado;
    }

    estadosCalculados++;

    if (estadosCalculados % LOG_A_CADA_ESTADOS === 0) {
      console.log("[Batidas] Progresso da busca exata.", {
        estadosCalculados,
        estadosMemorizados: memo.size,
        candidatos: candidatos.length,
      });
    }

    // Seleciona o primeiro tamanho ainda não coberto,
    // priorizando aqueles com menos candidatos.
    const indiceEscolhido = ordemTamanhos.find(
      (indice) => (mascaraAtual & (1 << indice)) === 0,
    );

    if (indiceEscolhido === undefined) {
      return 0;
    }

    let melhorPontuacao = Number.NEGATIVE_INFINITY;
    let melhorCandidato: Candidato | undefined;

    for (const candidato of candidatosPorTamanho[indiceEscolhido]!) {
      // Não permite reutilizar nenhum tamanho já coberto.
      if ((candidato.mascara & mascaraAtual) !== 0) {
        continue;
      }

      const proximaMascara = mascaraAtual | candidato.mascara;
      const pontuacaoRestante = resolver(proximaMascara);

      if (pontuacaoRestante === Number.NEGATIVE_INFINITY) {
        continue;
      }

      const pontuacaoTotal = candidato.largura + pontuacaoRestante;

      if (pontuacaoTotal > melhorPontuacao) {
        melhorPontuacao = pontuacaoTotal;
        melhorCandidato = candidato;
      }
    }

    if (!melhorCandidato) {
      solucoesImpossiveis++;
    } else {
      melhorEscolha.set(mascaraAtual, melhorCandidato);
    }

    memo.set(mascaraAtual, melhorPontuacao);

    return melhorPontuacao;
  }

  console.time("[Batidas] Tempo da busca");

  let melhorPontuacao: number;

  try {
    melhorPontuacao = resolver(0);
  } catch (erro) {
    console.error("[Batidas] A busca foi interrompida.", erro);
    throw erro;
  } finally {
    console.timeEnd("[Batidas] Tempo da busca");
  }

  if (melhorPontuacao === Number.NEGATIVE_INFINITY) {
    console.error(
      "[Batidas] Não existe sequência válida para todos os tamanhos.",
      {
        estadosCalculados,
        solucoesImpossiveis,
      },
    );

    return [];
  }

  // 4. Reconstrói a sequência ótima a partir das escolhas memorizadas.
  const sequencia: batidas_combinadas[] = [];
  let mascaraAtual = 0;

  while (mascaraAtual !== mascaraCompleta) {
    const candidato = melhorEscolha.get(mascaraAtual);

    if (!candidato) {
      console.error("[Batidas] Falha ao reconstruir a solução ótima.", {
        mascaraAtual,
      });
      return [];
    }

    sequencia.push(candidato.batida);
    mascaraAtual |= candidato.mascara;
  }

  // 5. Validação independente da sequência reconstruída.
  const tamanhosUtilizados = sequencia.flatMap((batida) => {
    const ativos: string[] = [];

    if (batida.qtd_batidas_nav1 > 0) {
      ativos.push(String(batida.tamanho_nav1));
    }

    if (batida.qtd_batidas_nav2 > 0) {
      ativos.push(String(batida.tamanho_nav2));
    }

    return ativos;
  });

  const conjuntoUtilizado = new Set(tamanhosUtilizados);

  const tamanhosAusentes = tamanhosNecessarios.filter(
    (tamanho) => !conjuntoUtilizado.has(tamanho),
  );

  const tamanhosRepetidos = tamanhosUtilizados.filter(
    (tamanho, indice) => tamanhosUtilizados.indexOf(tamanho) !== indice,
  );

  const margemRespeitada = sequencia.every(
    (batida) => batida.largura_total <= batida.largura_mesa - MARGEM_SEGURANCA,
  );

  const somaFinal = sequencia.reduce(
    (soma, batida) => soma + batida.largura_total,
    0,
  );

  const solucaoValida =
    tamanhosAusentes.length === 0 &&
    tamanhosRepetidos.length === 0 &&
    margemRespeitada &&
    tamanhosUtilizados.length === quantidadeTamanhos;

  console.log("[Batidas] Resultado final.", {
    sequencia,
    somaFinal,
    melhorPontuacao,
    estadosCalculados,
    estadosMemorizados: memo.size,
    solucoesImpossiveis,
    solucaoValida,
    tamanhosAusentes,
    tamanhosRepetidos,
    margemRespeitada,
    buscaConcluida: true,
    otimoGlobalComprovado: solucaoValida,
  });

  return solucaoValida ? sequencia : [];
}
