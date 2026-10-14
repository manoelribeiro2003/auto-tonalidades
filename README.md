# Automação do Cálculo de Tonalidades - FAB 05

## Sobre o projeto

Este projeto tem como objetivo automatizar o processo de cálculo e distribuição de tonalidades realizado pela equipe de Engenharia da Fábrica 5.

Atualmente, esse processo é realizado manualmente por meio de planilhas e análises operacionais. O sistema foi criado para reproduzir e automatizar as regras de negócio utilizadas pela Engenharia, reduzindo o tempo de execução, aumentando a confiabilidade dos resultados e facilitando futuras evoluções do processo.

A primeira versão do projeto está sendo desenvolvida em **TypeScript**, com foco na implementação das regras de negócio e dos algoritmos de cálculo.

Como evolução futura, o sistema será transformado em uma aplicação desktop utilizando **Electron**, disponibilizando uma interface gráfica interativa para os usuários finais.

---

## Objetivos

- Automatizar o cálculo de tonalidades.
- Reduzir atividades manuais realizadas pela Engenharia.
- Aumentar a confiabilidade dos resultados.
- Centralizar as regras de negócio do processo.
- Facilitar a manutenção e evolução do sistema.
- Disponibilizar futuramente uma interface gráfica amigável para os usuários.

---

## Tecnologias

### Atualmente

- TypeScript
- Node.js

### Planejadas para o futuro

- Electron
- Interface gráfica desktop
- Importação e exportação de planilhas Excel

---

## Arquitetura

O projeto está sendo desenvolvido com foco na separação entre:

- Regras de negócio
- Processamento de dados
- Interface do usuário

Essa abordagem permite que a lógica de cálculo seja reutilizada futuramente pela aplicação Electron sem necessidade de reescrita dos algoritmos.

---

## Status do Projeto

🚧 Em desenvolvimento

O projeto encontra-se em fase de implementação das regras de negócio e algoritmos de cálculo de tonalidades.

A interface gráfica será desenvolvida em uma etapa posterior utilizando Electron.

Demais 

## Documentação

A documentação detalhada do projeto pode ser encontrada na pasta [`docs`](./docscumentos disponíveis

- [Convenção de Commits](./docs/conventional-commits.md)
- [Anotações](./docs/anotacoes.md)