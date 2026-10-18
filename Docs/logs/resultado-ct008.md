# CT008 - Execução Assistida e E2E: Pedido takeaway com cartão de débito

## Status final

✅ PASSOU

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT008 - completes a takeaway order with debit card`

## Objetivo

Validar um pedido takeaway com pagamento por cartão de débito.

## Execução e resultados

| Passo | Ação | Resultado observado | Status |
|---:|---|---|:---:|
| 1 | Limpar o estado da aplicação | Página inicial recarregada | PASS |
| 2 | Selecionar **Para levar** | Fluxo takeaway iniciado | PASS |
| 3 | Selecionar **Fritas** e adicionar Batatas Full Stack | Produto adicionado ao pedido | PASS |
| 4 | Abrir o pedido e iniciar a finalização | Dialog de finalização aberto | PASS |
| 5 | Informar `Manual Takeaway Debit` e finalizar | Navegação para `/payment` | PASS |
| 6 | Selecionar **Cartão de Débito** | Navegação para `/payment/debit/confirm` | PASS |
| 7 | Validar a confirmação | Nome, tipo takeaway e débito visíveis | PASS |

## Evidências verificadas

- Rota final: `/payment/debit/confirm`.
- Cliente exibido: `Manual Takeaway Debit`.
- Tipo do pedido exibido: `Para levar`.
- Método exibido duas vezes: `Cartão de Débito`.

## Limitações

Este caso não faz uma asserção direta de valores de pedido ou de registro específico no banco de dados no spec automatizado.

## Conclusão

CT008 passou, cobrindo um pedido takeaway com cartão de débito.
