import { mkdirSync, writeFileSync } from "node:fs";
import type { batidas_combinadas } from "./batidas_e_larguras.utils.js";

// ==================================================================================================================================================================
/**
 * Função para salvar um arquivo com combinação de batidas
 * @param {string} tipo - Tipo do arquivo "txt" ou "json"
 * @param {batidas_combinadas[]} melhoresBatidasObj Array de batidas combinadas
 * @param {string} nomeArquivo String que contem o nome do arquivo
 * @param {string} caminho String opcional com o caminho para onde se deseja salvar o arquivo
 */
export function escreverArquivo(
  tipo: "txt" | "json",
  melhoresBatidasObj: {
    logs: string;
    melhoresBatidasPorNum: Record<string, batidas_combinadas[]>;
  },
  nomeArquivo: string,
  caminho?: string,
) {
  if (!nomeArquivo)
    throw new Error("Erro: nome de arquivo em branco ou inválido");

  if (caminho && !caminho.endsWith("/"))
    throw new Error("Erro: insira um caminho válido com '/' no final");

  const pastaDestino = caminho ?? `saidas/${tipo}/`;

  mkdirSync(pastaDestino, { recursive: true });

  const caminhoArquivo = `${pastaDestino}${nomeArquivo}.${tipo}`;

  const conteudo =
    tipo === "txt"
      ? melhoresBatidasObj.logs
      : JSON.stringify(melhoresBatidasObj.melhoresBatidasPorNum, null, 2);

  writeFileSync(caminhoArquivo, conteudo, "utf8");
}
