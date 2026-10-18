# CT005 - Execução Assistida e E2E: Validação de nome com espaços

## Status final

✅ PASSOU

## Última execução observada

- Data: 18/10/2026
- Nenhum pedido foi criado, conforme esperado para este cenário.

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT005 - rejects a whitespace-only customer name`

## Objetivo

Confirmar que um nome contendo somente espaços não permite o envio do pedido.

## Execução e resultados

| Passo | Ação | Resultado observado | Status |
|---:|---|---|:---:|
| 1 | Limpar o estado da aplicação | Página inicial recarregada | PASS |
| 2 | Selecionar **Para comer aqui** e adicionar Big Mock | Produto disponível no carrinho | PASS |
| 3 | Abrir o pedido e iniciar a finalização | Dialog de finalização visível | PASS |
| 4 | Preencher o nome com três espaços | Campo mantém o valor informado | PASS |
| 5 | Clicar em **Finalizar** | Pedido não é enviado | PASS |
| 6 | Verificar estado da tela | Permanece em `/cart`, dialog continua aberto e estado de envio não aparece | PASS |

## Evidências verificadas

- A rota permaneceu em `/cart`.
- O dialog `Finalizar Pedido` permaneceu visível.
- O campo continuou com o valor `"   "`.
- O texto `enviando a cozinha....` não foi exibido.
- O valor efetivamente mantido no campo foi `"   "` (três espaços).

## Conclusão

CT005 passou, confirmando a rejeição de nomes compostos somente por espaços.
