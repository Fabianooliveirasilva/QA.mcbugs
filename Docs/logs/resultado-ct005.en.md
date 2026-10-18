# CT005 - Assisted Execution and E2E: Whitespace-only name validation

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- No order was created, as expected for this scenario.

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Test: `CT005 - rejects a whitespace-only customer name`

## Objective

Confirm that a name containing only spaces does not allow order submission.

## Execution and results

| Step | Action | Observed result | Status |
|---:|---|---|:---:|
| 1 | Clear application state | Home page reloaded | PASS |
| 2 | Select **Para comer aqui** and add Big Mock | Product available in the cart | PASS |
| 3 | Open the order and start checkout | Checkout dialog visible | PASS |
| 4 | Fill the name with three spaces | Field kept the entered value | PASS |
| 5 | Click **Finalizar** | Order was not submitted | PASS |
| 6 | Verify screen state | Remained on `/cart`, dialog stayed open, and submitting state did not appear | PASS |

## Verified evidence

- Route remained `/cart`.
- `Finalizar Pedido` dialog remained visible.
- Field retained the value `"   "`.
- `enviando a cozinha....` was not displayed.
- The value kept in the field was `"   "` (three spaces).

## Conclusion

CT005 passed, confirming rejection of names composed only of spaces.
