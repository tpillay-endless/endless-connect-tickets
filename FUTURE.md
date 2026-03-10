# Endless Connect Tickets – Future Ideas & Extensions

## 1. QR & Ticket System
- Build our **own SVG QR generator** (custom line thickness, icon embedding, and color control).
- Add **vector-safe export options** (print-ready SVG + fallback PNG) (done ✅).
- Centralize all QR logic in `/lib/qr.ts` – already done, expand with optional style presets (done ✅).
- Add **server-side image caching** to speed up QR creation.
- Generate **lanyard PDFs automatically** with embedded QR + name layout.
- Explore direct **integration with Figma or Figma Tokens** for automating lanyard templates.

## 2. Events & Multi-Event Handling
- Extend DB schema with `eventCode` for multiple concurrent events.
- Add `/admin/export?event=CODE` filter.
- Include event selector on the admin export page.
- Build a **multi-event dashboard** for monitoring registration & check-ins live.

## 3. Waitlist & Overflow Handling
- If tickets reach 0, show **Waitlist Form** (same fields + hidden `waitlist: true`).
- Add waitlist CSV export for follow-up communication.
- Link the **registration form** to the full database pipeline: QR creation, record writing, and automated confirmation email.

## 4. Staff & Check-In
- Secure staff sessions with **login tokens instead of URLs**.
- Add **staff roles**: `superadmin`, `admin`, `host`, `staff` (done ✅).
- Live **check-in sync via WebSocket or Redis pub/sub**.
- Add a **spinner** or mini loading state before session validation (already planned).

## 5. Automation & Data
- Script to **import HubSpot CSVs** and auto-generate QRs (done ✅).
- Local tool to **build lanyard XLSX** (done ✅).
- Add a `backfill` utility for rebuilding Redis indexes when tickets are missing.
- Optional **analytics tracking** for exports & ticket scans.

## 6. Future Wishlist
- Build a **visual dashboard** for total / sold / checked-in in real time.
- Add **email notifications** (via Brevo) for registration confirmation.
- Integration with **Webflow CMS** or **Endless Cloud** to sync events automatically.
- **Endless Connect App**: internal web app for staff check-in, QR scanning, exports (done ✅).
- Use **SendGrid's Email Address Validation API** to improve deliverability.
    - Build our own instead of paying SendGrid $90/month
- **Automatically check-in people** if manual registration is on the day of the event.
- **Proper phone number field** in the registration form:
    - US preselected (US & Canada at the top of th list)
    - Country search option
    - Number normalization before submitting

## 7. Contact Info Sharing
- Once someone scans a vCard QR they can **save the contact and share their info** with it automatically

---

💡 *Add any new ideas here as they come up.*