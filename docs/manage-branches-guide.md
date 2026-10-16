# Guia de manejo de branches Git

Este guia descreve um fluxo prático para criar, usar, integrar e excluir branches no projeto `auto-tonalidades`. Os comandos são executados no terminal, dentro da pasta do repositório.

## 1. Conceitos básicos

- **Branch local:** branch existente no seu computador.
- **Branch remota:** branch publicada no servidor, por exemplo, no GitLab ou GitHub.
- **`main` / `master`:** branch principal do projeto. Use o nome que realmente existe no seu repositório.
- **`origin`:** nome remoto mais comum para o repositório hospedado.
- **Worktree:** diretório de trabalho adicional vinculado ao mesmo repositório Git. Uma branch não pode ser usada simultaneamente por mais de um worktree.

## 2. Conferir o estado atual

Antes de começar, veja em qual branch você está e se há alterações pendentes:

```bash
git status
git branch
git branch -a
```

Para atualizar as referências das branches remotas:

```bash
git fetch --prune
```

`git fetch` atualiza as referências remotas sem integrar mudanças automaticamente à sua branch atual. `--prune` remove referências locais a branches remotas que já foram excluídas do servidor.

## 3. Criar uma branch

Atualize a branch principal e crie a nova branch a partir dela:

```bash
git switch main
git pull
git switch -c feature/nome-da-funcionalidade
```

Substitua `main` pelo nome da branch principal do projeto, se for diferente.

O comando `git switch -c` cria a branch e já muda para ela. Escolha um nome curto e descritivo.

### Convenção de nomes sugerida

| Prefixo | Quando usar | Exemplo |
|---|---|---|
| `feature/` | Nova funcionalidade | `feature/electron-react` |
| `fix/` | Correção de defeito | `fix/erro-colagem` |
| `refactor/` | Refatoração sem mudar o objetivo funcional | `refactor/organiza-renderer` |
| `docs/` | Documentação | `docs/guia-branches` |
| `hotfix/` | Correção urgente | `hotfix/falha-inicializacao` |

A convenção é uma sugestão; mantenha o padrão adotado pela equipe, caso já exista um.

## 4. Trabalhar e fazer commits

Confira a branch antes de alterar arquivos:

```bash
git branch --show-current
git status
```

Adicione arquivos e crie um commit:

```bash
git add caminho/do/arquivo
git commit -m "feat: adiciona interface Electron"
```

Para incluir uma descrição mais longa no mesmo commit:

```bash
git commit -m "feat: adiciona interface Electron" -m "Prepara a interface para receber as funcionalidades da aplicação."
```

Prefixos comuns para mensagens de commit:

- `feat:` nova funcionalidade.
- `fix:` correção.
- `refactor:` reorganização ou melhoria interna.
- `docs:` documentação.
- `test:` testes.
- `chore:` manutenção e configuração.

Prefira commits pequenos, com mensagens que expliquem a mudança.

## 5. Publicar uma branch no remoto

Na primeira publicação:

```bash
git push -u origin feature/nome-da-funcionalidade
```

A opção `-u` configura a branch remota como upstream. Nas próximas publicações, normalmente basta:

```bash
git push
```

Para baixar as atualizações remotas sem integrá-las:

```bash
git fetch
```

Para integrar a versão remota da própria branch, depois de confirmar que está na branch correta:

```bash
git pull
```

## 6. Atualizar a branch de trabalho com a principal

Se a branch principal recebeu alterações enquanto você trabalhava, uma forma simples de integrá-las é:

```bash
git switch main
git pull
git switch feature/nome-da-funcionalidade
git merge main
```

Resolva eventuais conflitos nos arquivos indicados pelo Git. Depois, marque os conflitos como resolvidos e finalize a integração:

```bash
git add caminho/do/arquivo-resolvido
git commit
```

Se o Git concluir o merge automaticamente, talvez não seja necessário criar manualmente um commit adicional. Revise `git status` para confirmar a situação.

## 7. Integrar a branch ao projeto

O fluxo recomendado para uma equipe é abrir um Merge Request (GitLab) ou Pull Request (GitHub), revisar as alterações e integrá-las à branch principal pelo servidor.

Se o projeto permitir integração local, o processo básico é:

```bash
git switch main
git pull
git merge feature/nome-da-funcionalidade
git push
```

Antes de integrar, confira os commits e arquivos alterados:

```bash
git log --oneline main..feature/nome-da-funcionalidade
git diff main...feature/nome-da-funcionalidade
```

Não faça merge local se a política do projeto exigir revisão por Merge Request/Pull Request.

## 8. Excluir uma branch local

Primeiro, saia da branch que deseja excluir. Por exemplo:

```bash
git switch main
```

Depois, exclua a branch:

```bash
git branch -d feature/nome-da-funcionalidade
```

`-d` é a opção recomendada: o Git impede a exclusão se detectar commits que ainda não foram integrados.

Use `-D` somente quando tiver certeza de que não precisa mais dos commits exclusivos daquela branch:

```bash
git branch -D feature/nome-da-funcionalidade
```

**Importante:** não é possível excluir a branch que está ativa no worktree atual, nem uma branch que esteja em uso por outro worktree.

### Se aparecer o erro `cannot delete branch ... used by worktree`

Liste os worktrees:

```bash
git worktree list
```

Mude para outra branch no worktree que estiver usando a branch desejada. Se o worktree estiver em outro diretório, entre nele e execute `git switch outra-branch`.

Se um worktree adicional não for mais necessário, confira primeiro se há alterações locais que precisam ser preservadas. Só então remova-o:

```bash
git worktree remove "C:/caminho/do/worktree"
```

Não remova o diretório principal do repositório por engano. Evite `--force` a menos que compreenda as alterações que serão descartadas.

## 9. Excluir uma branch remota

Para apagar uma branch no servidor:

```bash
git push origin --delete feature/nome-da-funcionalidade
```

Isso não apaga automaticamente a cópia local da branch. Para removê-la localmente também, mude para outra branch e execute `git branch -d ...`.

Se uma branch já foi apagada no servidor, mas ainda aparece na lista de branches remotas:

```bash
git fetch --prune
```

**Atenção:** a exclusão remota afeta quem compartilha o repositório. Confirme o nome e verifique se a branch já foi integrada antes de excluí-la.

## 10. Renomear uma branch

Para renomear a branch atual:

```bash
git branch -m novo-nome
```

Para renomear outra branch local:

```bash
git branch -m nome-antigo novo-nome
```

Se ela já foi publicada, publique o novo nome e remova o antigo do remoto:

```bash
git push -u origin novo-nome
git push origin --delete nome-antigo
```

Avise outras pessoas que utilizam a branch e confira se há Merge Requests/Pull Requests associados antes de renomeá-la no fluxo compartilhado.

## 11. Recuperar uma branch excluída por engano

Se a branch tinha commits que ainda existem no repositório, pode ser possível recuperá-la pelo reflog:

```bash
git reflog
```

Localize o hash do último commit desejado e recrie a branch:

```bash
git switch -c nome-recuperado HASH_DO_COMMIT
```

A recuperação depende de o commit ainda estar disponível no repositório. Quanto antes agir, melhor.

## 12. Fluxo resumido recomendado

Para iniciar uma funcionalidade:

```bash
git switch main
git pull
git switch -c feature/nome-da-funcionalidade
```

Durante o trabalho:

```bash
git status
git add .
git commit -m "feat: descreve a mudança"
git push -u origin feature/nome-da-funcionalidade
```

Depois de integrar a branch por Merge Request/Pull Request:

```bash
git switch main
git pull
git branch -d feature/nome-da-funcionalidade
git push origin --delete feature/nome-da-funcionalidade
```

O último comando só é necessário se a branch remota não tiver sido excluída automaticamente pela plataforma.

## 13. Boas práticas

1. Confira `git status` antes de trocar de branch ou descartar alterações.
2. Crie branches a partir da branch-base correta e atualizada.
3. Use nomes descritivos e mensagens de commit objetivas.
4. Publique branches importantes para manter uma cópia no servidor.
5. Integre por Merge Request/Pull Request quando houver revisão de código.
6. Prefira `git branch -d`; use `-D` apenas conscientemente.
7. Antes de excluir uma branch, verifique se ela foi integrada e se há trabalho exclusivo nela.
8. Não confunda excluir uma branch com apagar arquivos de outra branch: o histórico Git continua preservado enquanto os commits estiverem referenciados ou recuperáveis.

---

**Checklist rápido antes de excluir uma branch**

- [ ] Estou em outra branch?
- [ ] Confirmei o nome exato com `git branch`?
- [ ] A branch já foi integrada ou confirmei que não preciso dos commits?
- [ ] Verifiquei `git worktree list` se a exclusão foi bloqueada?
- [ ] Quero excluir apenas localmente ou também no remoto?
