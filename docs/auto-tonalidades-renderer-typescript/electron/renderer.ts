type LinhaTSV = string[];

function interpretarTSV(texto: string): LinhaTSV[] {
  const linhas: LinhaTSV[] = [];
  let linha: string[] = [];
  let campo = "";
  let dentroDeAspas = false;

  for (let i = 0; i < texto.length; i++) {
    const caractere = texto[i];

    if (caractere === '"') {
      if (dentroDeAspas && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else {
        dentroDeAspas = !dentroDeAspas;
      }
      continue;
    }

    if (caractere === "\t" && !dentroDeAspas) {
      linha.push(campo);
      campo = "";
      continue;
    }

    if ((caractere === "\n" || caractere === "\r") && !dentroDeAspas) {
      if (caractere === "\r" && texto[i + 1] === "\n") {
        i++;
      }

      linha.push(campo);
      campo = "";

      if (linha.some((valor) => valor.trim() !== "")) {
        linhas.push(linha);
      }

      linha = [];
      continue;
    }

    campo += caractere;
  }

  linha.push(campo);

  if (linha.some((valor) => valor.trim() !== "")) {
    linhas.push(linha);
  }

  // Remove linhas vazias no final, comuns ao copiar células do Excel.
  while (linhas.length > 0 && linhas[linhas.length - 1].every((valor) => valor.trim() === "")) {
    linhas.pop();
  }

  return linhas;
}

function criarTabela(
  texto: string,
  cabecalho: HTMLElement,
  corpo: HTMLElement,
  resumo: HTMLElement,
  vazio: HTMLElement,
): void {
  cabecalho.replaceChildren();
  corpo.replaceChildren();

  const linhas = interpretarTSV(texto);

  if (linhas.length === 0) {
    resumo.textContent = "Nenhum dado identificado.";
    vazio.hidden = false;
    return;
  }

  vazio.hidden = true;

  const [primeiraLinha, ...demaisLinhas] = linhas;
  const trCabecalho = document.createElement("tr");

  for (const valor of primeiraLinha ?? []) {
    const th = document.createElement("th");
    th.textContent = valor;
    trCabecalho.appendChild(th);
  }

  cabecalho.appendChild(trCabecalho);

  for (const valores of demaisLinhas) {
    const tr = document.createElement("tr");

    for (const valor of valores) {
      const td = document.createElement("td");
      td.textContent = valor;
      tr.appendChild(td);
    }

    corpo.appendChild(tr);
  }

  const quantidadeColunas = primeiraLinha?.length ?? 0;
  const quantidadeDados = demaisLinhas.length;
  resumo.textContent = `${quantidadeDados} linha(s) de dados · ${quantidadeColunas} coluna(s)`;
}

function configurarColagem(numero: number): void {
  const area = document.querySelector<HTMLTextAreaElement>(`#colagem-${numero}`);
  const resumo = document.querySelector<HTMLElement>(`#resumo-${numero}`);
  const cabecalho = document.querySelector<HTMLTableSectionElement>(`#cabecalho-${numero}`);
  const corpo = document.querySelector<HTMLTableSectionElement>(`#corpo-${numero}`);
  const vazio = document.querySelector<HTMLElement>(`#vazio-${numero}`);

  if (!area || !resumo || !cabecalho || !corpo || !vazio) {
    console.warn(`Não foi possível configurar a área de colagem ${numero}: faltam elementos HTML.`);
    return;
  }

  const atualizarTabela = (texto: string): void => {
    criarTabela(texto, cabecalho, corpo, resumo, vazio);
  };

  area.addEventListener("paste", (evento: ClipboardEvent) => {
    const texto = evento.clipboardData?.getData("text/plain");

    if (texto === undefined) {
      return;
    }

    evento.preventDefault();
    area.value = texto;
    atualizarTabela(texto);
  });

  area.addEventListener("input", () => {
    atualizarTabela(area.value);
  });

  atualizarTabela(area.value);
}

for (let numero = 1; numero <= 4; numero++) {
  configurarColagem(numero);
}
