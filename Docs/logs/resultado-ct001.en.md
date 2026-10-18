# CT001 - Assisted Execution and E2E: Dine-in order with PIX

## Final status

✅ PASSED

## Last observed execution

- Date: 2026-10-18
- Generated order: `#99`
- Customer: `QA CT001`
- Total: `R$ 85.70`
- Confirmation route: `/payment/pix/confirm`

## Method and source

- Initial execution in an agent-controlled browser through Playwright MCP.
- Re-execution observed in the local controlled browser environment.
- Subsequent automation with Playwright in Chromium.
- Spec: [`playwright/e2e/ct001-dine-in.spec.ts`](../../playwright/e2e/ct001-dine-in.spec.ts)
- Test: `CT001 - deve concluir um pedido dine-in com pagamento via PIX`

## Objective

Validate a dine-in order with two Big Mock items, one Coca-Crash, and PIX payment.

## Preconditions

- Application available at `http://localhost:3000`.
- Chromium project enabled.
- Application state cleared before execution.
- Supabase available for order creation.

## Execution and results

| Step | Action | Expected result | Observed result | Status |
|---:|---|---|---|:---:|
| 1 | Clear application state | No residual local data | State cleared and home page reloaded | PASS |
| 2 | Select **Para comer aqui** | Navigate to the menu | Dine-in flow started and `mcbugs-order-type` was set to `dine-in` | PASS |
| 3 | Add two Big Mock items | Product added with quantity 2 | Cart displayed 2 Big Mock items for `R$ 79.80` | PASS |
| 4 | Add one Coca-Crash | Drink added to the cart | Cart displayed 1 Coca-Crash for `R$ 5.90` | PASS |
| 5 | Open the order and start checkout | Checkout drawer visible | Cart displayed 3 items and a total of `R$ 85.70` | PASS |
| 6 | Enter the name and finish | Order created and navigate to `/payment` | Order created and payment page opened | PASS |
| 7 | Select **PIX** | Navigate to `/payment/pix/confirm` | Confirmation route opened for order `#99` | PASS |
| 8 | Validate confirmation | Order data, PIX, and call message visible | `QA CT001`, `Comer no local`, PIX, items, total, and message were displayed | PASS |
| 9 | Start a new order | Return to root and clear state | App returned to `/` and `mcbugs-cart-items` became `[]` | PASS |

## Verified evidence

- Final route: `/payment/pix/confirm`.
- Displayed order: `#99`.
- Displayed customer: `QA CT001`.
- Displayed order type: `Comer no local`.
- Displayed payment method: `PIX`.
- Displayed items: `2x Big Mock` and `1x Coca-Crash`.
- Displayed total: `R$ 85.70`.
- The call-waiting message was displayed for the dine-in order.
- After **Fazer Novo Pedido**, the app returned to `/` and the cart was cleared.

## Limitations

This execution observed the interface behavior and local application state. No independent database query was performed to validate the created record.

## Conclusion

CT001 passed, covering the dine-in order journey with two Big Mock items, one Coca-Crash, PIX payment, confirmation, and final state cleanup.
