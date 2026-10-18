# CT002 - Assisted Execution and E2E: Takeaway order with credit card

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- Generated order: `#98`
- Customer: `QA CT002`
- Total: `R$ 39.50`
- Confirmation route: `/payment/credit/confirm`

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Re-execution observed in the local controlled browser environment.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct002-takeaway.spec.ts`](../../playwright/e2e/ct002-takeaway.spec.ts)
- Test: `CT002 - deve concluir um pedido takeaway com pagamento via cartão de crédito`

## Objective

Validate a takeaway order with two Batatas Full Stack, three Fanta Warning items, and credit card payment.

## Preconditions

- Application available at `http://localhost:3000`.
- Chromium project enabled.
- Application state cleared before execution.
- Supabase available for order creation.

## Execution and results

| Step | Action | Expected result | Observed result | Status |
|---:|---|---|---|:---:|
| 1 | Clear application state | No residual local data | State cleared and home page reloaded | PASS |
| 2 | Select **Para levar** | Navigate to the menu | Takeaway flow started and `mcbugs-order-type` was set to `takeaway` | PASS |
| 3 | Add one Batatas Full Stack | Product added to the cart | Item added for `R$ 10.90` | PASS |
| 4 | Add three Fanta Warning items | Drinks added to the cart | Item added with quantity 3 for `R$ 17.70` | PASS |
| 5 | Increase Batatas Full Stack to 2 | Quantity and total recalculated | Cart displayed 2 fries and a total of `R$ 39.50` | PASS |
| 6 | Open the order and start checkout | Checkout drawer visible | Cart displayed 5 items and a total of `R$ 39.50` | PASS |
| 7 | Enter the name and finish | Order created and navigate to `/payment` | Order created and payment page opened | PASS |
| 8 | Select **Cartão de Crédito** | Navigate to `/payment/credit/confirm` | Confirmation route opened for order `#98` | PASS |
| 9 | Validate confirmation | Order data and method visible, without call message | `QA CT002`, `Para levar`, credit card, items, and total were displayed; call message was absent | PASS |
| 10 | Start a new order | Return to root and clear state | App returned to `/` and `mcbugs-cart-items` became `[]` | PASS |

## Verified evidence

- Final route: `/payment/credit/confirm`.
- Displayed order: `#98`.
- Displayed customer: `QA CT002`.
- Displayed order type: `Para levar`.
- Displayed payment method: `Cartão de Crédito`.
- Displayed items: `2x Batatas Full Stack` and `3x Fanta Warning`.
- Displayed total: `R$ 39.50`.
- The call-waiting message was not displayed for the takeaway order.
- After **Fazer Novo Pedido**, the app returned to `/` and the cart was cleared.

## Limitations

This execution observed the interface behavior and local application state. No independent database query was performed to validate the created record.

## Conclusion

CT002 passed, covering the takeaway order journey with quantity adjustments, credit card payment, confirmation, and final state cleanup.
