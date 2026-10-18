# CT006 - Execução Assistida e E2E: Persistência do carrinho após recarregar

## Status final

✅ PASSOU

## Método e fonte

- Execução inicial em navegador controlado por agente via Playwright MCP.
- Automação posterior com Playwright em Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Teste: `CT006 - preserves cart contents after a page reload`

## Objetivo

Verificar que o item adicionado ao pedido permanece disponível após o recarregamento da página.

## Execução e resultados

| Passo | Ação | Resultado observado | Status |
|---:|---|---|:---:|
| 1 | Limpar o estado da aplicação | Página inicial recarregada | PASS |
| 2 | Selecionar **Para comer aqui** e adicionar Big Mock | Item adicionado ao carrinho | PASS |
| 3 | Recarregar a página | Indicador do carrinho continua exibindo um item | PASS |
| 4 | Verificar `localStorage` | `mcbugs-cart-items` contém `big-mock` | PASS |
| 5 | Abrir o pedido | Página `/cart` é acessada | PASS |
| 6 | Validar o item e o preço | Big Mock visível e preço `R$ 39,90` aparece duas vezes | PASS |

## Evidências verificadas

- O indicador exibiu `/ 1 item` após o reload.
- `localStorage.mcbugs-cart-items` continha `big-mock`.
- Big Mock ficou visível na página `/cart`.
- O preço `R$ 39,90` foi identificado duas vezes.

## Conclusão

CT006 passou, confirmando a persistência do conteúdo do carrinho após o recarregamento.
