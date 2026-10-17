# Automated Testing Report

## McBugs Self-Service Restaurant Kiosk

| Field | Value |
|---|---|
| Test type | End-to-end browser automation |
| Framework | Playwright Test 1.63.0 |
| Language | TypeScript |
| Browser | Chromium |
| Test runner | `npx playwright test --reporter=line` |
| Execution date | 2026-10-17 |
| Result | **11 passed, 0 failed** |

## Executive summary

The automated regression suite executed both complete customer journeys currently implemented in the repository:

- CT001: dine-in order paid by PIX
- CT002: takeaway order paid by credit card
- CT003: dine-in order paid by debit card
- CT004: takeaway order paid by PIX
- CT005: whitespace-only customer-name validation
- CT006: cart persistence after page reload
- CT007: pending-order cancellation and state cleanup
- CT008: takeaway order paid by debit card
- CT009: repeated addition of the same product
- CT010: empty-cart state
- CT011: invalid persisted cart recovery

Both tests passed in Chromium. The suite exercised the UI through accessible roles and labels, validated route changes, checked local storage state, verified product and cart data, and confirmed payment-specific confirmation pages.

## Scope and coverage

| Test case | Journey | Main assertions | Result |
|---|---|---|:---:|
| CT001 | Dine-in | Big Mock x2, Coca-Crash x1, PIX, dine-in confirmation, state reset | PASS |
| CT002 | Takeaway | Batatas Full Stack x2, Fanta Warning x3, credit card, takeaway confirmation, state reset | PASS |
| CT003 | Dine-in | Big Mock x1, debit card, dine-in confirmation | PASS |
| CT004 | Takeaway | Batatas Full Stack x1, PIX, takeaway confirmation | PASS |
| CT005 | Validation | Whitespace-only customer name keeps checkout open | PASS |
| CT006 | Cart state | Big Mock remains after page reload | PASS |
| CT007 | Cancellation | Pending order cancellation clears application state | PASS |
| CT008 | Takeaway | Batatas Full Stack x1, debit card, takeaway confirmation | PASS |
| CT009 | Cart rules | Repeated Big Mock addition consolidates quantity and total | PASS |
| CT010 | Empty state | Direct `/cart` access displays empty-cart guidance | PASS |
| CT011 | Resilience | Invalid cart JSON recovers to an empty cart | PASS with console observation |

### Covered functional areas

- Landing page rendering
- Dine-in and takeaway order-type selection
- Order-type persistence in `localStorage`
- Menu category filtering
- Product detail pages
- Quantity increment controls
- Line totals and order totals
- Cart navigation and contents
- Checkout dialog and customer-name entry
- Order submission loading state
- Payment-method options
- PIX confirmation route
- Credit-card confirmation route
- Confirmation content by order type
- Cart and order-type cleanup after a new order
- Pending-order cancellation and cleanup of current-order state
- Whitespace-only customer-name rejection
- Cart recovery after page reload
- Repeated-product quantity consolidation
- Empty-cart direct access
- Invalid persisted cart recovery

## Test implementation

### CT001 - Dine-in with PIX

Source: [`playwright/e2e/ct001-dine-in.spec.ts`](../../playwright/e2e/ct001-dine-in.spec.ts)

The test:

1. Clears application state.
2. Selects **Dine in**.
3. Adds two Big Mock items and one Coca-Crash.
4. Verifies the calculated total of **R$ 85,70**.
5. Submits the order for `João Silva`.
6. Verifies the payment page and the empty cart.
7. Selects PIX and verifies `/payment/pix/confirm`.
8. Checks dine-in-specific confirmation text.
9. Starts a new order and verifies local state cleanup.

### CT002 - Takeaway with credit card

Source: [`playwright/e2e/ct002-takeaway.spec.ts`](../../playwright/e2e/ct002-takeaway.spec.ts)

The test:

1. Clears application state.
2. Selects **Takeaway**.
3. Filters the menu to fries and adds one Batatas Full Stack.
4. Filters the menu to beverages and adds three Fanta Warning items.
5. Increases the fries quantity to two and verifies the final total of **R$ 39,50**.
6. Submits the order for `Maria Santos`.
7. Verifies the payment page and the empty cart.
8. Selects credit card and verifies `/payment/credit/confirm`.
9. Confirms takeaway-specific content and absence of the dine-in calling message.
10. Starts a new order and verifies local state cleanup.

## Test design and maintainability

The suite uses:

- Playwright `test` and `expect` APIs.
- Accessible locators such as `getByRole`, `getByLabel`, and `getByText`.
- A shared state-reset helper in each journey.
- Explicit assertions after navigation and user actions.
- Deterministic product names, quantities, routes, and totals.
- Confirmation-page assertions that distinguish business rules between dine-in and takeaway orders.

The test files are intentionally readable as executable business journeys, which makes them useful both as regression checks and as living acceptance-test documentation.

### Additional regression scenarios

Source: [`playwright/e2e/ct003-ct007-regression.spec.ts`](../../playwright/e2e/ct003-ct007-regression.spec.ts)

These five scenarios were first executed manually through the Playwright MCP browser session and then automated:

- **CT003** validates the debit-card confirmation for a dine-in order.
- **CT004** validates PIX confirmation for a takeaway order and confirms that the dine-in message is absent.
- **CT005** validates that a whitespace-only customer name does not submit the order.
- **CT006** validates cart recovery after a page reload.
- **CT007** validates cancellation from the payment page and clearing of all order-related local storage keys.
- **CT008** validates the remaining payment matrix combination: takeaway with debit card.
- **CT009** validates that adding the same product twice consolidates quantity and total.
- **CT010** validates the empty-cart state when `/cart` is opened without items.
- **CT011** validates recovery from malformed cart JSON and confirms that the application remains usable.

## Reproduction

From the repository root:

```bash
npx playwright test --reporter=line
```

The Playwright configuration starts the Vite development server at `http://localhost:3000` and runs the Chromium project. In environments without a display server, the same suite can be executed with a virtual display:

```bash
xvfb-run -a npx playwright test --reporter=line
```

## Validation results

### End-to-end suite

```text
Running 2 tests using 2 workers
11 passed (including the original CT001-CT002 journeys)
```

### Production build

```text
npm run build
Build completed successfully.
```

### Lint status

`npm run lint` currently reports three errors and eight warnings in existing application/configuration files, including `src/components/ui/command.tsx`, `src/components/ui/textarea.tsx`, and `tailwind.config.ts`. These findings did not prevent the production build or the two Playwright journeys from passing, but they should be addressed in a separate code-quality task.

## Limitations and next steps

- The automated tests currently run only in Chromium; Firefox, WebKit, and mobile projects are not enabled in the Playwright configuration.
- The tests validate persistence indirectly through UI and `localStorage`; they do not query Supabase directly.
- Negative paths are not covered yet, including empty customer name, failed order creation, network failure, and unavailable payment options.
- The suite would benefit from CI execution with stored HTML reports, traces on failure, and test artifacts.
- Additional payment coverage should include PIX, debit card, and credit card across the supported order types.

## Conclusion

The current automated regression baseline is healthy: **2 of 2 implemented end-to-end journeys passed**. The suite provides meaningful coverage of the principal ordering flows and demonstrates maintainable Playwright practices suitable for continued project evolution.
