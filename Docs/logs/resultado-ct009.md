# CT009 - Execução Assistida e E2E: Adição repetida do mesmo produto

## Status final

✅ PASSOU

## Última execução observada

- Data: 18/10/2026
- Nenhum pedido foi criado; o caso avaliou somente o carrinho.

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT009 - consolidates repeated additions of the same product`

## Objetivo

Verificar que adicionar o mesmo produto duas vezes consolida a quantidade e recalcula o total.

## Execução e resultados

| Passo | Ação | Resultado observado | Status |
|---:|---|---|:---:|
| 1 | Limpar o estado da aplicação | Página inicial recarregada | PASS |
| 2 | Selecionar **Para comer aqui** e adicionar Big Mock | Primeiro item adicionado | PASS |
| 3 | Selecionar Big Mock novamente | Segundo item adicionado ao mesmo pedido | PASS |
| 4 | Verificar a quantidade consolidada | Indicador exibe `/ 2 itens` | PASS |
| 5 | Verificar o total | Total exibido como `R$ 79,80` | PASS |

## Evidências verificadas

- Quantidade consolidada: 2 itens.
- Total calculado: `R$ 79,80`.
- `localStorage.mcbugs-cart-items` manteve um único produto com `quantity: 2`.
- O cenário não cria duas linhas independentes no fluxo validado.

## Conclusão

CT009 passou, confirmando a consolidação de adições repetidas do mesmo produto.
