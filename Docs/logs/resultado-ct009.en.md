# CT009 - Assisted Execution and E2E: Repeated addition of the same product

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- No order was created; this case evaluated the cart only.

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Test: `CT009 - consolidates repeated additions of the same product`

## Objective

Verify that adding the same product twice consolidates the quantity and recalculates the total.

## Execution and results

| Step | Action | Observed result | Status |
|---:|---|---|:---:|
| 1 | Clear application state | Home page reloaded | PASS |
| 2 | Select **Para comer aqui** and add Big Mock | First item added | PASS |
| 3 | Select Big Mock again | Second item added to the same order | PASS |
| 4 | Verify consolidated quantity | Indicator displayed `/ 2 itens` | PASS |
| 5 | Verify total | Total displayed as `R$ 79.80` | PASS |

## Verified evidence

- Consolidated quantity: 2 items.
- Calculated total: `R$ 79.80`.
- `localStorage.mcbugs-cart-items` kept one product with `quantity: 2`.
- The validated flow did not create two independent cart lines.

## Conclusion

CT009 passed, confirming consolidation of repeated additions of the same product.
