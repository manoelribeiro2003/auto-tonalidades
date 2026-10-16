import { mkdirSync, writeFileSync } from "node:fs";
import type { batidas_combinadas } from "./batidas_e_larguras.utils.js";

// ==================================================================================================================================================================
/**
 * Salva dados em um arquivo nos formatos TXT ou JSON.
 *
 * Para arquivos TXT, grava os dados como texto simples.
 * Para arquivos JSON, serializa os dados recebidos em formato JSON,
 * preservando a estrutura dos objetos e arrays compatíveis.
 *
 * @param tipo - Formato do arquivo a ser gerado: "txt" ou "json".
 * @param dados - Dados que serão gravados no arquivo. Para JSON, aceita
 * qualquer estrutura serializável em JSON.
 * @param nomeArquivo - Nome do arquivo, sem a extensão.
 * @param caminho - Caminho opcional da pasta de destino. Deve terminar
 * com "/" quando informado. Se omitido, utiliza a pasta padrão
 * correspondente ao formato selecionado.
 */
export function escreverArquivo<T>(
  tipo: "txt" | "json",
  dados: T,
  nomeArquivo: string,
  caminho?: string,
): void {
  if (!nomeArquivo)
    throw new Error("Erro: nome de arquivo em branco ou inválido");

  if (caminho && !caminho.endsWith("/"))
    throw new Error("Erro: insira um caminho válido com '/' no final");

  const pastaDestino =
    caminho ?? `resources/${tipo === "txt" ? "templates/" : "data/"}`;

  mkdirSync(pastaDestino, { recursive: true });

  const caminhoArquivo = `${pastaDestino}${nomeArquivo}.${tipo}`;

  const conteudo =
    tipo === "txt" ? String(dados) : JSON.stringify(dados, null, 2);

  writeFileSync(caminhoArquivo, conteudo, "utf8");
}
