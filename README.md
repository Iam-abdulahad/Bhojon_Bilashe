# Bhojon Bilash

Restaurant website built with Next.js, TypeScript, MongoDB/Mongoose, and Tailwind CSS.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and provide the required values.
3. Start the app with `npm run dev`.
4. Open <http://localhost:3000>.

Menu and reviews can use the checked-in JSON data when MongoDB is unavailable. Reservations require a working MongoDB connection; the API will report an error rather than claim a reservation was saved when the database is offline.

## Environment variables

- `MONGODB_URI` — MongoDB connection string. Keep it server-side and never prefix it with `NEXT_PUBLIC_`.
- `EMAIL_PROVIDER` — `resend` in production. `console` is only a local development preview and does not deliver email in production.
- `RESEND_API_KEY` — Required when `EMAIL_PROVIDER=resend`.
- `EMAIL_FROM` — Sender address verified with Resend.
- `ADMIN_EMAIL` — Destination for contact-form messages.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — Restaurant WhatsApp number in international digits-only format; public by design.

The restaurant phone, WhatsApp number, site URL, address, and other public details are in `data/site-config.ts`. Replace the placeholder business details before launch.

## Production checks

Run these commands before deployment:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Deploy as a Node.js Next.js app (not a static export) because reservations and contact forms use server route handlers. Configure production environment variables in the hosting provider, allow the deployed server to connect to MongoDB in the MongoDB network settings, and verify the production domain, email sender, business contact details, and WhatsApp number.

After deployment, test the menu, dish pages, reservation availability and booking, contact-form delivery, order-to-WhatsApp flow, and mobile layout on the production domain. Do not run `npm run seed` against a production database unless intentionally replacing all menu records; the script clears the existing menu collection first.
