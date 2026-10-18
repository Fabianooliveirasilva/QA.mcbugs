# CT003 - Assisted Execution and E2E: Dine-in order with debit card

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- Generated order: `#86`
- Customer: `QA CT003`
- Total: `R$ 39.90`
- Confirmation route: `/payment/debit/confirm`

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Re-execution observed in the local controlled browser environment.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)
- Test: `CT003 - completes a dine-in order with debit card`

## Objective

Validate a dine-in order with debit card payment and the specific confirmation-page content.

## Preconditions

- Application available at `http://localhost:3000`.
- Chromium project enabled.
- Application state cleared before execution.
- Supabase available for order creation.

## Execution and results

| Step | Action | Expected result | Observed result | Status |
|---:|---|---|---|:---:|
| 1 | Clear application state | No residual local data | State cleared and home page reloaded | PASS |
| 2 | Select **Para comer aqui** | Navigate to the menu | Dine-in flow started and Big Mock was available | PASS |
| 3 | Add one Big Mock | Product added to the cart | Product added to the order | PASS |
| 4 | Open the order and start checkout | Checkout drawer visible | Drawer opened and name field was available | PASS |
| 5 | Enter the customer name and finish | Order created and navigate to `/payment` | Order `#86` created and payment page opened | PASS |
| 6 | Select **Cartão de Débito** | Navigate to `/payment/debit/confirm` | Confirmation route opened | PASS |
| 7 | Validate confirmation | Name, dine-in type, payment method, and call message visible | `QA CT003`, `Comer no local`, and `Cartão de Débito` were displayed; call message was visible | PASS |

## Verified evidence

- Final route: `/payment/debit/confirm`.
- Displayed customer: `QA CT003`.
- Displayed order type: `Comer no local`.
- Payment method displayed twice: `Cartão de Débito`.
- Call-waiting message displayed for the dine-in order.
- Displayed order: `#86`.
- Displayed total: `R$ 39.90`.

## Limitations

The automated spec does not directly assert order values or a specific database record.

## Conclusion

CT003 passed, covering confirmation of a dine-in order with debit card payment.
