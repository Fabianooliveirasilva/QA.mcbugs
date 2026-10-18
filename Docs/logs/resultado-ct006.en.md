# CT006 - Assisted Execution and E2E: Cart persistence after reload

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- No order was created; this case evaluated cart persistence only.

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Test: `CT006 - preserves cart contents after a page reload`

## Objective

Verify that an item added to the order remains available after the page is reloaded.

## Execution and results

| Step | Action | Observed result | Status |
|---:|---|---|:---:|
| 1 | Clear application state | Home page reloaded | PASS |
| 2 | Select **Para comer aqui** and add Big Mock | Item added to the cart | PASS |
| 3 | Reload the page | Cart indicator continued to display one item | PASS |
| 4 | Verify `localStorage` | `mcbugs-cart-items` contained `big-mock` | PASS |
| 5 | Open the order | `/cart` was opened | PASS |
| 6 | Validate item and price | Big Mock visible and `R$ 39.90` appeared twice | PASS |

## Verified evidence

- Indicator displayed `/ 1 item` after reload.
- `localStorage.mcbugs-cart-items` contained `big-mock`.
- Big Mock was visible on `/cart`.
- The price `R$ 39.90` was identified twice.
- Persisted value contained product `big-mock` with quantity `1`.

## Conclusion

CT006 passed, confirming cart-content persistence after a page reload.
