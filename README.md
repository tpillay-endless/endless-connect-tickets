This is a [Next.js](https://nextjs.org) project bootstrapped with [`webflow cloud init`](https://developers.webflow.com/webflow-cloud/intro).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

You can deploy your app by running [`webflow cloud deploy`](https://developers.webflow.com/webflow-cloud/environment).

## Storage (Webflow Cloud SQLite / D1)

This project now uses Webflow Cloud SQLite storage through a D1 binding named `DATABASE`.

1. In Webflow Cloud storage setup, create/select your SQLite database.
2. Copy the `database_id` from Webflow and paste it into `wrangler.json`.
3. Keep the binding name as `DATABASE`.
4. Ensure migrations are present in `./migrations` (already added in this repo).
5. Commit and deploy.
