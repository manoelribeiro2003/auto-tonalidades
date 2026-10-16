# Migrar o renderizador Electron de JavaScript para TypeScript

Este pacote contém `electron/renderer.ts` e `tsconfig.renderer.json`. Ele não usa React e mantém o renderizador como HTML + CSS + TypeScript.

## 1. Copie os arquivos

- Copie `electron/renderer.ts` para a pasta `electron/` do projeto.
- Copie `tsconfig.renderer.json` para a raiz do projeto.

O `renderer.ts` espera que o HTML tenha estes IDs para cada área, de 1 a 4:

- `colagem-1` até `colagem-4` (textarea)
- `resumo-1` até `resumo-4`
- `cabecalho-1` até `cabecalho-4` (thead)
- `corpo-1` até `corpo-4` (tbody)
- `vazio-1` até `vazio-4`

## 2. Atualize o script no HTML

No `electron/index.html`, substitua:

```html
<script src="./renderer.js"></script>
```

por:

```html
<script src="../dist-electron/renderer.js"></script>
```

O caminho acima considera que `index.html` está em `electron/` e que o JavaScript compilado será criado em `dist-electron/` na raiz. Se o HTML estiver em outra pasta, ajuste o caminho relativo.

## 3. Adicione um script ao package.json

Mantenha seus scripts existentes e acrescente:

```json
"build:renderer": "tsc -p tsconfig.renderer.json"
```

Para compilar o renderizador, execute:

```bash
npm run build:renderer
```

O TypeScript será convertido para `dist-electron/renderer.js`, que é o arquivo carregado pelo HTML.

## 4. Compile antes de abrir o Electron

Se o comando que inicia o Electron ainda não compila o renderizador, altere-o para executar a compilação antes de iniciar o app. Por exemplo, adapte o script existente:

```json
"electron:dev": "npm run build:renderer && electron ."
```

Use esse exemplo somente se `electron .` já estiver configurado corretamente para abrir a janela do aplicativo. Não substitua scripts `dev` e `dev:cls` existentes, pois eles pertencem ao fluxo atual da aplicação Node.

## Observações

- O Chromium não executa `.ts` diretamente; ele executa o JavaScript gerado.
- Não mantenha no HTML uma referência ao `renderer.ts`.
- O `renderer.ts` usa APIs do DOM e não depende de React nem de acesso direto às APIs Node.
- Este pacote não modifica `main.ts`, `preload`, `package.json` ou `electron/index.html` automaticamente. Aplique as alterações indicadas e confira os caminhos conforme a estrutura real do projeto.
