# Conventional Commits

## `feat`

Nova funcionalidade.

```bash
git commit -m "feat: adicionar cálculo automático de tonalidades"
```

### Exemplos

- Criar uma nova tela
- Adicionar um endpoint
- Adicionar uma nova regra de negócio

---

## `fix`

Correção de bug.

```bash
git commit -m "fix: corrigir cálculo incorreto de consumo"
```

### Exemplos

- Corrigir exceção
- Ajustar resultado errado
- Resolver problema de performance causado por bug

---

## `refactor`

Refatoração sem alterar o comportamento esperado.

```bash
git commit -m "refactor: simplificar algoritmo de combinação de batidas"
```

### Exemplos

- Extrair funções
- Renomear variáveis
- Melhorar organização do código
- Trocar `forEach` por `reduce`

> Não deve mudar a funcionalidade para o usuário.

---

## `chore`

Tarefas de manutenção.

```bash
git commit -m "chore: atualizar dependências"
```

### Exemplos

- Atualizar bibliotecas
- Ajustar configuração do ESLint
- Alterar `.gitignore`
- Configurar CI/CD

---

## `docs`

Alteração de documentação.

```bash
git commit -m "docs: atualizar README com instruções de instalação"
```

### Exemplos

- README
- JSDoc
- Wiki
- Comentários explicativos

---

## `test`

Criação ou alteração de testes.

```bash
git commit -m "test: adicionar testes para cálculo de tonalidades"
```

### Exemplos

- Testes unitários
- Testes de integração
- Mock de dependências

---

## `style`

Mudanças de formatação sem alteração de lógica.

```bash
git commit -m "style: corrigir indentação e formatação"
```

### Exemplos

- Espaçamento
- Quebra de linhas
- Ordem de imports (dependendo da equipe)

---

## `perf`

Melhoria de performance.

```bash
git commit -m "perf: reduzir complexidade da busca de combinações"
```

### Exemplos

- Reduzir tempo de execução
- Menos consumo de memória
- Otimização de consultas