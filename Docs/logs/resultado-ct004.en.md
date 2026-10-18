# CT004 - Assisted Execution and E2E: Takeaway order with PIX

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- Generated order: `#87`
- Customer: `QA CT004`
- Total: `R$ 10.90`
- Confirmation route: `/payment/pix/confirm`

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Test: `CT004 - completes a takeaway order with PIX`

## Objective

Validate a takeaway order with PIX payment and confirm that the dine-in-specific message is not displayed.

## Execution and results

| Step | Action | Observed result | Status |
|---:|---|---|:---:|
| 1 | Clear application state | Home page reloaded without residual state | PASS |
| 2 | Select **Para levar** | Takeaway flow started | PASS |
| 3 | Open **Fritas** | Category products available | PASS |
| 4 | Select and add **Batatas Full Stack** | Product added to the order | PASS |
| 5 | Open the order and start checkout | Checkout drawer opened | PASS |
| 6 | Enter the customer name and finish | Navigated to `/payment` | PASS |
| 7 | Select **PIX** | Navigated to `/payment/pix/confirm` | PASS |
| 8 | Validate confirmation | Name, takeaway type, and PIX visible | PASS |
| 9 | Validate dine-in message | Call-waiting message absent | PASS |

## Verified evidence

- Final route: `/payment/pix/confirm`.
- Displayed customer: `QA CT004`.
- Displayed order type: `Para levar`.
- Payment method displayed twice: `PIX`.
- Call-waiting message was not displayed.
- Displayed item: `1x Batatas Full Stack`.

## Limitations

The automated spec does not directly assert order values or a specific database record.

## Conclusion

CT004 passed, covering confirmation of a takeaway order with PIX and the absence of the dine-in-only message.
