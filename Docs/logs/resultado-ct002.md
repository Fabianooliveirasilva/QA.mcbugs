# CT002 - Execução Assistida e E2E: Pedido takeaway com cartão de crédito

## Status final

✅ PASSOU

## Última execução observada

- Data: 18/10/2026
- Pedido gerado: `#98`
- Cliente informado: `QA CT002`
- Total: `R$ 39,50`
- Rota de confirmação: `/payment/credit/confirm`

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Reexecução observada em navegador controlado no ambiente local.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct002-takeaway.spec.ts`](../../playwright/e2e/ct002-takeaway.spec.ts)
- Teste: `CT002 - deve concluir um pedido takeaway com pagamento via cartão de crédito`

## Objetivo

Validar a conclusão de um pedido takeaway com duas Batatas Full Stack, três Fanta Warning e pagamento por cartão de crédito.

## Pré-condições

- Aplicação disponível em `http://localhost:3000`.
- Projeto Chromium habilitado.
- Estado da aplicação limpo antes da execução.
- Supabase disponível para a criação do pedido.

## Execução e resultados

| Passo | Ação | Resultado esperado | Resultado observado | Status |
|---:|---|---|---|:---:|
| 1 | Limpar o estado da aplicação | Estado local sem dados residuais | Estado local limpo e página inicial recarregada | PASS |
| 2 | Selecionar **Para levar** | Navegação para o menu | Fluxo takeaway iniciado e `mcbugs-order-type` definido como `takeaway` | PASS |
| 3 | Adicionar uma Batatas Full Stack | Produto incluído no carrinho | Item adicionado por `R$ 10,90` | PASS |
| 4 | Adicionar três Fanta Warning | Bebidas incluídas no carrinho | Item adicionado com quantidade 3 por `R$ 17,70` | PASS |
| 5 | Aumentar Batatas Full Stack para 2 | Quantidade e total recalculados | Carrinho exibiu 2 batatas e total de `R$ 39,50` | PASS |
| 6 | Abrir o pedido e iniciar a finalização | Drawer de finalização visível | Carrinho exibiu 5 itens e total de `R$ 39,50` | PASS |
| 7 | Informar o nome e finalizar | Pedido criado e navegação para `/payment` | Pedido criado e página de pagamento acessada | PASS |
| 8 | Selecionar **Cartão de Crédito** | Navegação para `/payment/credit/confirm` | Rota de confirmação acessada para o pedido `#98` | PASS |
| 9 | Validar a confirmação | Dados do pedido e método exibidos, sem mensagem de chamada | `QA CT002`, `Para levar`, cartão de crédito, itens e total foram exibidos; mensagem de chamada não foi exibida | PASS |
| 10 | Iniciar novo pedido | Retorno à raiz e limpeza do estado | Aplicação retornou para `/` e `mcbugs-cart-items` ficou como `[]` | PASS |

## Evidências verificadas

- Rota final: `/payment/credit/confirm`.
- Pedido exibido: `#98`.
- Cliente exibido: `QA CT002`.
- Tipo do pedido exibido: `Para levar`.
- Método de pagamento exibido: `Cartão de Crédito`.
- Itens exibidos: `2x Batatas Full Stack` e `3x Fanta Warning`.
- Total exibido: `R$ 39,50`.
- Mensagem de aguardar chamada não exibida para o pedido takeaway.
- Após **Fazer Novo Pedido**, a aplicação retornou para `/` e o carrinho foi limpo.

## Limitações

Esta execução observou o comportamento da interface e o estado local da aplicação. Não foi realizada uma consulta independente ao banco para validar o registro criado.

## Conclusão

CT002 passou, cobrindo a jornada de pedido takeaway com ajuste de quantidades, pagamento por cartão de crédito, confirmação e limpeza do estado final.
