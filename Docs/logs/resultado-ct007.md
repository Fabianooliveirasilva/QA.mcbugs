# CT007 - Execução Assistida e E2E: Cancelamento de pedido pendente

## Status final

✅ PASSOU

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT007 - cancels a pending order and clears application state`

## Objetivo

Validar o cancelamento de um pedido pendente e a limpeza do estado local relacionado ao pedido.

## Execução e resultados

| Passo | Ação | Resultado observado | Status |
|---:|---|---|:---:|
| 1 | Limpar o estado da aplicação | Página inicial recarregada | PASS |
| 2 | Selecionar **Para comer aqui** e adicionar Big Mock | Item adicionado ao carrinho | PASS |
| 3 | Iniciar a finalização com um nome de cliente | Página `/payment` acessada | PASS |
| 4 | Clicar em **Cancelar Pedido** | Retorno para `/` | PASS |
| 5 | Verificar o carrinho | `mcbugs-cart-items` contém `[]` | PASS |
| 6 | Verificar o tipo de pedido | `mcbugs-order-type` é nulo | PASS |
| 7 | Verificar o pedido atual | `mcbugs-current-order` é nulo | PASS |

## Evidências verificadas

- Cancelamento retornou à rota `/`.
- `localStorage.mcbugs-cart-items` foi limpo.
- `localStorage.mcbugs-order-type` foi removido.
- `localStorage.mcbugs-current-order` foi removido.

## Conclusão

CT007 passou, confirmando o cancelamento do pedido pendente e a limpeza das chaves de estado verificadas.
