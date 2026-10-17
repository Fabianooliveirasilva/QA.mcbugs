# Manual Testing Report

## McBugs Self-Service Restaurant Kiosk

| Field | Value |
|---|---|
| Test type | Manual end-to-end testing |
| Primary scenario | CT001 - Dine-in order |
| Execution status | **Passed** |
| Application URL | `http://localhost:8080` |
| Evidence source | Manual execution log in [`Docs/logs/resultado-ct001.md`](../logs/resultado-ct001.md) |
| Database | Supabase |
| Execution date | Not recorded in the source log |

## Executive summary

The complete dine-in ordering journey was manually executed from order-type selection through payment-method confirmation. The test covered navigation, product selection, quantity calculation, cart persistence, order creation, payment selection, database persistence, and final state cleanup.

The scenario passed without functional defects. The order was created with the expected customer, order type, payment method, status, total, and item details. The application also cleared the local state after the user selected **Start a New Order**.

## Objective

Verify that a customer can place a complete **dine-in** order and that the application preserves consistent data across:

- The landing page and order-type selection
- The menu and product details
- Quantity and total-price calculations
- The shopping cart
- Order creation in Supabase
- Payment-method selection
- Payment confirmation
- Local state reset

## Preconditions

The following conditions were verified before execution:

- The application was available at `http://localhost:8080`.
- The application was running.
- Supabase was connected and accessible.
- `localStorage` was cleared before the test.

## Detailed execution results

| # | Action | Expected result | Actual result | Status |
|---:|---|---|---|:---:|
| 1 | Open the root URL | The landing page displays the dine-in and takeaway options. | The landing page loaded with both options. | PASS |
| 2 | Select **Dine in** | The order type is stored as `dine-in` and the user is redirected to `/menu`. | The value was stored and navigation succeeded. | PASS |
| 3 | Inspect the menu | Categories and products are displayed. | The menu displayed the expected categories and products. | PASS |
| 4 | Select **Big Mock** | The product details page opens. | The application navigated to `/product/big-mock`. | PASS |
| 5 | Inspect product details | Name, image, price, description, and ingredients are displayed. | All expected product information was displayed. | PASS |
| 6 | Increase quantity to two | Quantity becomes two and the total is recalculated. | Quantity became two and the total was recalculated to R$ 79,80. | PASS |
| 7 | Add the product to the order | The product is added and the user returns to the menu. | The item was added and the application returned to `/menu`. | PASS |
| 8 | Inspect the cart bar | The item count and total are correct. | The cart displayed two items and R$ 79,80. | PASS |
| 9 | Open the order | The cart page opens. | The application navigated to `/cart`. | PASS |
| 10 | Inspect cart contents | Big Mock is listed with quantity two and the correct total. | The item and total were correct. | PASS |
| 11 | Start checkout | A checkout drawer opens and requests the customer name. | The checkout drawer opened successfully. | PASS |
| 12 | Enter `João Silva` | The name field accepts and displays the entered value. | The name was displayed correctly. | PASS |
| 13 | Submit the order | The order is created as `pending` and the user is redirected to payment. | Supabase order creation succeeded and navigation to `/payment` occurred. | PASS |
| 14 | Select PIX | The payment method is stored and the PIX confirmation page opens. | The application navigated to `/payment/pix/confirm`. | PASS |
| 15 | Inspect confirmation | The order number, total, payment method, and instructions are displayed. | The expected confirmation information was displayed. | PASS |
| 16 | Verify the database record | Persisted order data matches the submitted order. | The record contained the expected values listed below. | PASS |
| 17 | Select **Start a New Order** | The user returns to the landing page and local state is cleared. | The application returned to `/` and cleared the local state. | PASS |

## Database verification

The Supabase record was verified with the following values:

```text
customer_name: João Silva
order_type: dine-in
payment_method: pix
status: pending
total: 79.80
items:
  - productId: big-mock
    name: Big Mock
    price: 39.90
    quantity: 2
```

## Functional areas covered

- Happy-path dine-in ordering
- Product details rendering
- Quantity increment
- Cart persistence
- Total-price calculation
- Checkout form submission
- Supabase order persistence
- PIX payment selection
- Dine-in confirmation messaging
- Local storage cleanup

## Defects and observations

### Functional defects

No functional defects were identified during this execution.

### Improvement opportunities

The following are product or UX improvements rather than failed acceptance criteria:

1. Make the “order sent to the kitchen” state more explicit to the customer.
2. Improve the visual distinction of loading and submit states while an order is being created.

## Limitations

- This report documents the recorded CT001 manual execution; it is not a claim that every application feature was manually tested.
- The source log does not include an execution timestamp, browser version, operating-system version, or screenshot attachments.
- The manual scenario validates one dine-in order and one PIX payment path. Other payment methods and negative paths require separate execution.

## Conclusion

CT001 passed. The manual evidence demonstrates a consistent end-to-end dine-in experience, including order persistence in Supabase and cleanup after completion. The scenario is suitable as a baseline acceptance test for future regression cycles.
