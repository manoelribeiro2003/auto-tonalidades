# ANOTAÇÕES

## Impacto no aproveitamento de largura

No método [`getDivisaoDeTonalidades()`](../src/utils/consumo.utils.ts#L69-L132), durante a divisão de tonalidades, não está sendo levado em consideração a ordem de numeração ex: [334, 35, 36, 378, 39, 40, 41, 42, 434, 45] e nem a combinação de melhores batidas, apenas a ordem do objeto onde guarda as informações de numeração das navalhas. Leva apenas em consideração a reserva de tons e o consumo das navalhas.

Isso influencia as batidas entre números, de modo que pode ocorrer de as combinações de batidas com melhores aproveitamentos não sejam feitas devido as numerações estarem em tons diferentes, impactando na obtenção dos melhores aproveitamentos de largura.

No [algoritmo](../src/utils/consumo.utils.ts#L78-L86):

```js
 const consumosCombinados = Object.entries(
    consumoDasNavalhas.nav1.consumo,
  ).reduce(
    (acc, [chave, valor]) => {
      acc[chave] = valor + (consumoDasNavalhas.nav2.consumo[chave] ?? 0);
      return acc;
    },
    {} as Record<string, number>,
  );
```

Na construção dos consumo combinados, a ordenação deverá ocorrer de acordo com as melhores larguras aproveitadas resultadas das combinações de batidas.

Essa funcionalidade não foi implementada devido a complexidade de ter que levar em consideração a quantidade de pares e a ordem da combinação da batida.

A função [`getConsumoDasNavalhas()`](../src/utils/consumo.utils.ts#L30-L60) usa um array de tonalidades apenas para fazer a divisão das batidas. Quem deverá realizar a melhor divisão de tonalidades será a função `getDivisaoDeTonalidades()` pois ela receberá o tipo `batidas_combinadas` e nisso a divisão das tonalidades seria com uma variavel a mais: melhores aproveitamentos por combinação

O certo deveria ser o metodo `getDivisaoDeTonalidades()` levar em consideração as melhores batidas.
Atualmente nesta branch o metodo `melhores_batidas()` não está mais levando em consideração a divisão de tonalidades.
Deverá então o metodo `getDivisaoDeTonalidades()` implementar a divisão com base nas melhores batidas.

- Eu nao posso pegar aquele que é o primeiro, pq pode ser que uma das navalhas tenha a qtd de batidas zerada

- Tenho que levar em consideração a qtd de pares a serem produzidos de cada tamanho:
  o tamanho 1 deverá ser aquele que tem a quantidade maior de pares a produzir em relação a qtd de pares do tamanho 2

- O tamanho 1 (que tem a maior quantidade de pares a produzir) deverá ter a proxima sequencia de batidas sozinho:
  quando a qtd de pares do tamanho 2 tiver acabado, a proxima sequencia de batida será a do tamanho 1

As proximas sequencias não deverá levar em consideração um tamanho que ja foi escolhido anteriormente

- primeiro comeco pelo maior tom
