# Payments

How a paid reading on Divine Insight actually becomes paid, and what you have
to configure before it works.

## The rule

An order becomes `paid` in exactly one place: `src/routes/api/stripe-webhook.ts`,
after Stripe's signature has been verified. Nothing else in the codebase may
write that status, and the browser is never believed about entitlement — it
holds an order id, and the server says what that id is worth.

Before this, fulfilment was honor-based: the unlock CTA opened a Stripe payment
link and the draw was never gated, so every paid reading was free to anyone who
scrolled past the CTA.

## The flow

1. Visitor clicks Unlock. The browser POSTs `{ sku }` to `/api/checkout` — a SKU
   key, never a price.
2. `/api/checkout` opens a `pending` order, looks the price up in its own table
   (`SKUS` in `src/lib/orders.ts`), and returns the Stripe payment link with
   `?client_reference_id=<order id>` appended.
3. Visitor pays on Stripe. Stripe POSTs `checkout.session.completed` to
   `/api/stripe-webhook` with that `client_reference_id`.
4. The webhook verifies the signature, checks `amount_total` against the SKU's
   price, and flips the order to `paid`.
5. The page has been polling `/api/order/<id>`; it sees `paid` and unlocks the
   draw.
6. When the cards are down, the page POSTs the reading to `/api/reading`, which
   spends one credit and stores it. The Reading Bundle is simply an order with
   three credits.

## What you have to set up

**1. Environment variables**

| Variable | Where it comes from |
| --- | --- |
| `DATABASE_URL` | Already handled — the Neon database card injects it. Re-run `bun run go-live` after connecting so production picks it up. |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks → your endpoint → Signing secret (`whsec_...`). |

Without `STRIPE_WEBHOOK_SECRET` the webhook refuses every request, which means
no order ever becomes paid. That is the intended failure direction: a
misconfigured site sells nothing rather than giving everything away.

**2. A webhook endpoint in Stripe**

- URL: `https://<your site>/api/stripe-webhook`
- Event: `checkout.session.completed` (that one event is enough)

**3. Payment links that allow a client reference**

The four links in `src/lib/payments.ts` are Stripe Payment Links. Appending
`?client_reference_id=<uuid>` works on them out of the box — no dashboard change
needed. Just do not edit a link's price in the dashboard without updating
`SKUS`, because the webhook compares the two and refuses to fulfil on a
mismatch.

## Testing it

```sh
stripe listen --forward-to localhost:3000/api/stripe-webhook
stripe trigger checkout.session.completed
```

`stripe listen` prints its own `whsec_...` — use that one locally.

To check the gate end to end: open a reading, click Unlock, and pay with the
`4242 4242 4242 4242` test card. The draw should unlock on its own within a few
seconds of the receipt, without a refresh.

To check the gate actually holds, open `/api/order/<a made-up uuid>` — it must
answer 404, and `/api/reading` with that id must answer 402.

## Database

Three tables, created on first use by `ensureSchema()` in `src/lib/orders.ts`
(this template has no migration runner, so the schema bootstraps itself):

- `orders` — one row per checkout attempt, with status and remaining credits
- `readings` — every stored reading, keyed to its order (this is the journal)
- `stripe_events` — applied webhook event ids, so a Stripe retry is a no-op

## Still to do

- Wire the remaining three CTAs (Single Insight, Reading Bundle, Gift Reading)
  to `useEntitlement`. Extended Reading is the worked example.
- Gift Reading still does not deliver anything to the recipient. The order now
  captures `recipient_email`, `sender_name`, and `note`, so what remains is
  picking an email sender and adding a claim link.
- Tips stay honor-based on purpose. A tip unlocks nothing, so there is nothing
  to verify.
