# CT011 - Assisted Execution and E2E: Recovery from invalid cart JSON

## Final status

✅ PASSED with observation

## Last observed execution

- Date: 2026-10-18
- No order was created; this case evaluated recovery of persisted state.

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Test: `CT011 - recovers from invalid persisted cart JSON`

## Objective

Verify that the application remains usable and recovers the cart when persisted data contains invalid JSON.

## Execution and results

| Step | Action | Observed result | Status |
|---:|---|---|:---:|
| 1 | Clear application state | Home page reloaded | PASS |
| 2 | Store `invalid-json` in `mcbugs-cart-items` | Invalid state prepared in `localStorage` | PASS |
| 3 | Store `dine-in` in `mcbugs-order-type` | Order type set for the scenario | PASS |
| 4 | Access `/menu` and reload | Menu remained usable | PASS |
| 5 | Verify persisted cart | `mcbugs-cart-items` was recovered as `[]` | PASS |

## Verified evidence

- The `🍔 Lanches` category remained visible after recovery.
- Final `localStorage.mcbugs-cart-items` value was `[]`.
- A parse error was recorded in the console during recovery.
- Observed error: `SyntaxError: Unexpected token 'i'` while parsing `invalid-json`.

## Observation

The case passed functionally, but the console parse error remains a technical observation. The application recovers the state, but error handling could be improved to avoid console noise.

## Conclusion

CT011 passed with an observation, confirming recovery from invalid cart data and continued menu usability.
