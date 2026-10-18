# CT008 - Assisted Execution and E2E: Takeaway order with debit card

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- Generated order: `#90`
- Customer: `QA CT008`
- Total: `R$ 10.90`
- Confirmation route: `/payment/debit/confirm`

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Test: `CT008 - completes a takeaway order with debit card`

## Objective

Validate a takeaway order with debit card payment.

## Execution and results

| Step | Action | Observed result | Status |
|---:|---|---|:---:|
| 1 | Clear application state | Home page reloaded | PASS |
| 2 | Select **Para levar** | Takeaway flow started | PASS |
| 3 | Select **Fritas** and add Batatas Full Stack | Product added to the order | PASS |
| 4 | Open the order and start checkout | Checkout dialog opened | PASS |
| 5 | Enter the customer name and finish | Navigated to `/payment` | PASS |
| 6 | Select **Cartão de Débito** | Navigated to `/payment/debit/confirm` | PASS |
| 7 | Validate confirmation | Name, takeaway type, and debit method visible | PASS |

## Verified evidence

- Final route: `/payment/debit/confirm`.
- Displayed customer: `QA CT008`.
- Displayed order type: `Para levar`.
- Payment method displayed twice: `Cartão de Débito`.
- Displayed item: `1x Batatas Full Stack`.

## Limitations

The automated spec does not directly assert order values or a specific database record.

## Conclusion

CT008 passed, covering a takeaway order with debit card payment.
