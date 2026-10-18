# CT001 - Execução Assistida e E2E: Pedido dine-in com PIX

## Status final

✅ PASSOU

## Última execução observada

- Data: 18/10/2026
- Pedido gerado: `#99`
- Cliente informado: `QA CT001`
- Total: `R$ 85,70`
- Rota de confirmação: `/payment/pix/confirm`

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Reexecução observada em navegador controlado no ambiente local.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct001-dine-in.spec.ts`](../../playwright/e2e/ct001-dine-in.spec.ts)
- Teste: `CT001 - deve concluir um pedido dine-in com pagamento via PIX`

## Objetivo

Validar a conclusão de um pedido dine-in com dois Big Mock, uma Coca-Crash e pagamento por PIX.

## Pré-condições

- Aplicação disponível em `http://localhost:3000`.
- Projeto Chromium habilitado.
- Estado da aplicação limpo antes da execução.
- Supabase disponível para a criação do pedido.

## Execução e resultados

| Passo | Ação | Resultado esperado | Resultado observado | Status |
|---:|---|---|---|:---:|
| 1 | Limpar o estado da aplicação | Estado local sem dados residuais | Estado local limpo e página inicial recarregada | PASS |
| 2 | Selecionar **Para comer aqui** | Navegação para o menu | Fluxo dine-in iniciado e `mcbugs-order-type` definido como `dine-in` | PASS |
| 3 | Adicionar dois Big Mock | Produto incluído com quantidade 2 | Carrinho exibiu 2 Big Mock por `R$ 79,80` | PASS |
| 4 | Adicionar uma Coca-Crash | Bebida incluída no carrinho | Carrinho exibiu 1 Coca-Crash por `R$ 5,90` | PASS |
| 5 | Abrir o pedido e iniciar a finalização | Drawer de finalização visível | Carrinho exibiu 3 itens e total de `R$ 85,70` | PASS |
| 6 | Informar o nome e finalizar | Pedido criado e navegação para `/payment` | Pedido criado e página de pagamento acessada | PASS |
| 7 | Selecionar **PIX** | Navegação para `/payment/pix/confirm` | Rota de confirmação acessada para o pedido `#99` | PASS |
| 8 | Validar a confirmação | Dados do pedido, PIX e mensagem de chamada visíveis | `QA CT001`, `Comer no local`, PIX, itens, total e mensagem foram exibidos | PASS |
| 9 | Iniciar novo pedido | Retorno à raiz e limpeza do estado | Aplicação retornou para `/` e `mcbugs-cart-items` ficou como `[]` | PASS |

## Evidências verificadas

- Rota final: `/payment/pix/confirm`.
- Pedido exibido: `#99`.
- Cliente exibido: `QA CT001`.
- Tipo do pedido exibido: `Comer no local`.
- Método de pagamento exibido: `PIX`.
- Itens exibidos: `2x Big Mock` e `1x Coca-Crash`.
- Total exibido: `R$ 85,70`.
- Mensagem de aguardar chamada exibida para o pedido dine-in.
- Após **Fazer Novo Pedido**, a aplicação retornou para `/` e o carrinho foi limpo.

## Limitações

Esta execução observou o comportamento da interface e o estado local da aplicação. Não foi realizada uma consulta independente ao banco para validar o registro criado.

## Conclusão

CT001 passou, cobrindo a jornada de pedido dine-in com dois Big Mock, uma Coca-Crash, pagamento por PIX, confirmação e limpeza do estado final.
