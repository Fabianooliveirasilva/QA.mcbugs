# CT011 - Execução Assistida e E2E: Recuperação de JSON inválido do carrinho

## Status final

✅ PASSOU com observação

## Última execução observada

- Data: 18/10/2026
- Nenhum pedido foi criado; o caso avaliou a recuperação do estado persistido.

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT011 - recovers from invalid persisted cart JSON`

## Objetivo

Verificar se a aplicação permanece utilizável e recupera o carrinho quando o valor persistido contém JSON inválido.

## Execução e resultados

| Passo | Ação | Resultado observado | Status |
|---:|---|---|:---:|
| 1 | Limpar o estado da aplicação | Página inicial recarregada | PASS |
| 2 | Gravar `invalid-json` em `mcbugs-cart-items` | Estado inválido preparado no `localStorage` | PASS |
| 3 | Gravar `dine-in` em `mcbugs-order-type` | Tipo de pedido definido para o cenário | PASS |
| 4 | Acessar `/menu` e recarregar | Menu continua utilizável | PASS |
| 5 | Verificar o carrinho persistido | `mcbugs-cart-items` é recuperado como `[]` | PASS |

## Evidências verificadas

- A categoria `🍔 Lanches` permaneceu visível após a recuperação.
- O valor final de `localStorage.mcbugs-cart-items` foi `[]`.
- O relatório registra um erro de parse no console durante a recuperação.
- O erro observado foi `SyntaxError: Unexpected token 'i'` ao tentar interpretar `invalid-json`.

## Observação

O caso passou funcionalmente, mas o erro de parse no console permanece como observação técnica. A aplicação recupera o estado, porém o tratamento do erro pode ser melhorado para evitar ruído no console.

## Conclusão

CT011 passou com observação, confirmando a recuperação do carrinho inválido e a continuidade de uso do menu.
