# FreshLane — hyperlocal multi-vendor grocery delivery

A runnable starter for a Zepto-style marketplace where one customer cart can contain products from several shops. The customer pays once; after Razorpay verification, the API creates one `MasterOrder` and a private `SubOrder` for each shop.

## Repository

- `backend/` — Express, MongoDB/Mongoose, JWT, Razorpay verification, FCM adapter
- `web/vendor/` — plain HTML/CSS/JS vendor console
- `web/admin/` — plain HTML/CSS/JS operations console
- `customer_app/` — Flutter customer app structure and all requested screen entry points
- `delivery_app/` — Flutter rider app structure and all requested screen entry points

## Run the API

Requirements: Node 20+, MongoDB 6+ (a replica set is required for transactional checkout), and Razorpay test credentials.

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set `ADMIN_PHONE` and `ADMIN_PASSWORD` in `.env` to use the admin login. Check `GET http://localhost:4000/health` after startup.

The checkout flow is:

1. Add items with `POST /api/cart/items`.
2. Validate/reprice with `POST /api/cart/validate`.
3. Create a Razorpay intent with `POST /api/checkout/create-order`, including `deliveryLocation` and `address`.
4. Open Razorpay Checkout in Flutter using the returned order and key.
5. Submit its IDs/signature to `POST /api/checkout/verify-payment`.
6. The transaction revalidates live price, availability, stock, minimum shop totals, status and radius; then creates the master order, creates shop sub-orders, atomically decrements stock and clears the cart.

All protected endpoints use `Authorization: Bearer <JWT>`. Vendor queries always include the authenticated shop ID, preventing cross-shop access. The demo auth route uses phone/password; replace it with an OTP provider before production while retaining JWT issuance.

## Web panels

Serve `web/` from any static server (for example VS Code Live Server). They default to `http://localhost:4000/api`. To change it in the browser console:

```js
localStorage.apiBase = 'https://api.example.com/api'
```

Entry pages are `web/vendor/vendor-login.html` and `web/admin/admin-login.html`.

## Flutter apps

In each app folder:

```bash
flutter pub get
flutter run
```

Android emulators use `10.0.2.2:4000`. Change the `baseUrl` in `lib/core/api.dart` for a device or deployed API. Add the platform-specific Google Maps key, `google-services.json`/`GoogleService-Info.plist`, Firebase initialization, and Razorpay platform setup before enabling those SDK flows.

## Production checklist

- Use HTTPS, secret management, rate limiting, request validation, audit logging and refresh-token rotation.
- Replace password login with a real SMS OTP challenge and expiry/attempt limits.
- Add Razorpay webhooks and idempotency/reconciliation jobs; perform partial refunds through Razorpay rather than only marking refund state.
- Assign riders using capacity and route optimization; verify delivery OTP server-side.
- Store media in object storage, add tax/coupon rules, paging, search and observability.
- Run MongoDB as a replica set so checkout and settlement transactions are atomic.

## Tests

```bash
cd backend
npm test
```

The included pricing test locks the example from the specification: 3 shops, 4 km → ₹66 delivery fee.

## Deploy to Render

This repository includes `render.yaml` for a free Render web service. Create a free MongoDB Atlas cluster first, then deploy the repository as a Render Blueprint. Render will request `MONGODB_URI`, `ADMIN_PASSWORD`, and optional Razorpay/Firebase secrets during setup. The service hosts both the API and the admin/vendor panels.
