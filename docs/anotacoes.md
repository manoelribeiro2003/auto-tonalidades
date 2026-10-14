# ANOTAÇÕES

### Impacto no aproveitamento de largura

No método `dividirTonalidades()`, durante a divisão de tonalidades, não está sendo levado em consideração a ordem de numeração ex: [334, 35, 36, 378, 39, 40, 41, 42, 434, 45] e nem a combinação de melhores batidas, apenas a ordem do objeto onde guarda as informações de numeração das navalhas.

Isso influencia as batidas entre números, de modo que pode ocorrer de as combinações de batidas com melhores aproveitamentos não sejam feitas devido as numerações estarem em tons diferentes, impactando na obtenção dos melhores aproveitamentos de largura.

No método:
```js
const consumosCombinados = Object.entries(consumos.nav1.consumo).reduce(
    (acc, [chave, valor]) => {
      acc[chave] = valor + (consumos.nav2.consumo[chave] ?? 0);
      return acc;
    },
    {} as Record<string, number>,
  );
```
Na construção dos consumo combinados, a ordenação deverá ocorrer de acordo com as melhores larguras aproveitadas resultadas das combinações de batidas.

Essa funcionalidade não foi implementada devido a complexidade de ter que levar em consideração a quantidade de pares e a ordem da combinação da batida.

A função `melhores_batidas()` usa um array de tonalidades apenas para fazer a divisão das batidas. Quem deverá realizar a melhor divisão de tonalidades será a função `getDivisaoDeTonalidades()` pois ela receberá o tipo `batidas_combinadas` e nisso a divisão das tonalidades seria com uma variavel a mais: melhores aproveitamentos por combinação

O certo deveria ser o metodo `getDivisaoDeTonalidades()` levar em consideração as melhores batidas.
Atualmente nesta branch o metodo `melhores_batidas()` não está mais levando em consideração a divisão de tonalidades. 
Deverá então o metodo `getDivisaoDeTonalidades()` implementar a divisão com base nas melhores batidas.