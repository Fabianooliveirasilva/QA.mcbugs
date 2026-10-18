# CT003 - Execução Assistida e E2E: Pedido dine-in com cartão de débito

## Status final

✅ PASSOU

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT003 - completes a dine-in order with debit card`

## Objetivo

Validar a conclusão de um pedido dine-in com pagamento por cartão de débito e confirmar o conteúdo específico da página de confirmação.

## Pré-condições

- Aplicação disponível em `http://localhost:3000`.
- Projeto Chromium habilitado.
- Estado da aplicação limpo antes da execução.
- Supabase disponível para a criação do pedido.

## Execução e resultados

| Passo | Ação | Resultado esperado | Resultado observado | Status |
|---:|---|---|---|:---:|
| 1 | Limpar o estado da aplicação | Estado local sem dados residuais | Estado local limpo e página inicial recarregada | PASS |
| 2 | Selecionar **Para comer aqui** | Navegação para o menu | Fluxo dine-in iniciado e produto Big Mock disponibilizado | PASS |
| 3 | Adicionar um Big Mock | Produto incluído no carrinho | Produto adicionado ao pedido | PASS |
| 4 | Abrir o pedido e iniciar a finalização | Drawer de finalização visível | Drawer aberto e campo de nome disponível | PASS |
| 5 | Informar `Manual Debit` e finalizar | Pedido criado e navegação para `/payment` | Página de pagamento acessada | PASS |
| 6 | Selecionar **Cartão de Débito** | Navegação para `/payment/debit/confirm` | Rota de confirmação acessada | PASS |
| 7 | Validar a confirmação | Nome, tipo dine-in, método de pagamento e mensagem de chamada visíveis | `Manual Debit`, `Comer no local` e `Cartão de Débito` foram exibidos; mensagem de aguardar chamada ficou visível | PASS |

## Evidências verificadas

- Rota final: `/payment/debit/confirm`.
- Cliente exibido: `Manual Debit`.
- Tipo do pedido exibido: `Comer no local`.
- Método exibido duas vezes: `Cartão de Débito`.
- Mensagem de aguardar chamada exibida para o pedido dine-in.

## Limitações

Este caso não faz uma asserção direta de valores de pedido ou de registro específico no banco de dados no spec automatizado.

## Conclusão

CT003 passou, cobrindo a confirmação de um pedido dine-in com cartão de débito.
