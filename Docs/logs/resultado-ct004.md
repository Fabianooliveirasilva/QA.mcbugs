# CT004 - Execução Assistida e E2E: Pedido takeaway com PIX

## Status final

✅ PASSOU

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT004 - completes a takeaway order with PIX`

## Objetivo

Validar um pedido takeaway com pagamento via PIX e confirmar que a mensagem específica de pedidos dine-in não aparece.

## Execução e resultados

| Passo | Ação | Resultado observado | Status |
|---:|---|---|:---:|
| 1 | Limpar o estado da aplicação | Página inicial recarregada sem estado residual | PASS |
| 2 | Selecionar **Para levar** | Fluxo takeaway iniciado | PASS |
| 3 | Abrir a categoria **Fritas** | Produtos da categoria disponíveis | PASS |
| 4 | Selecionar e adicionar **Batatas Full Stack** | Produto adicionado ao pedido | PASS |
| 5 | Abrir o pedido e iniciar a finalização | Drawer de finalização aberto | PASS |
| 6 | Informar `Manual PIX Takeaway` e finalizar | Navegação para `/payment` | PASS |
| 7 | Selecionar **PIX** | Navegação para `/payment/pix/confirm` | PASS |
| 8 | Validar a confirmação | Nome, tipo takeaway e método PIX visíveis | PASS |
| 9 | Validar mensagem dine-in | Mensagem de aguardar chamada ausente | PASS |

## Evidências verificadas

- Rota final: `/payment/pix/confirm`.
- Cliente exibido: `Manual PIX Takeaway`.
- Tipo do pedido exibido: `Para levar`.
- Método exibido duas vezes: `PIX`.
- Mensagem de aguardar chamada não exibida.

## Limitações

Este caso não faz uma asserção direta de valores de pedido ou de registro específico no banco de dados no spec automatizado.

## Conclusão

CT004 passou, cobrindo a confirmação de um pedido takeaway com PIX e a ausência de mensagem exclusiva do fluxo dine-in.
