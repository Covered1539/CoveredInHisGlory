# Covered in His Glory

Static website for **Covered in His Glory** — handcrafted, Scripture-rooted gifts. Faith woven into every detail (Numbers 15:39).

Built as plain HTML/CSS/JS (no build step) and ready to deploy on **Vercel** as a static site.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `shop.html` | Shop |
| `devotion.html` | Today's Devotion + archive |
| `prayer.html` | Prayer Wall (private + public) |
| `custom-orders.html` | Custom Orders |
| `about.html` | Our Story |
| `contact.html` | Contact |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `404.html` | Not Found |

Shared assets: `css/styles.css`, `js/main.js`, `vercel.json`.

## Deploy on Vercel

1. Import this repository in Vercel.
2. Framework preset: **Other** (static). No build command, no output directory needed.
3. Deploy.

## Before going live — TODO

Search the codebase for `PLACEHOLDER` and `href="#"` and replace them:

- **Forms (Formspree):** Create a free account at [formspree.io](https://formspree.io), add one form per submission type, and replace each `https://formspree.io/f/PLACEHOLDER` action with your real endpoint. Point the forms' notification email to `grace@coveredinhisglory.com`.
  - Newsletter — `index.html`
  - Private prayer + prayer wall — `prayer.html`
  - Custom order — `custom-orders.html`
  - Contact — `contact.html`
  
  Until real IDs are added, forms show the confirmation message without sending (so the site works immediately).
- **Shop links:** In `shop.html`, replace the product `href="#"` and the "View Full Shop on Etsy" `href="#"` with your real Etsy listing/shop URLs.
- **Social links:** Confirm the Instagram/Facebook URLs in the footer and contact page.

## Notes

- Every form includes a hidden `_gotcha` honeypot field for spam protection.
- Public prayer wall submissions are intended to be **manually reviewed** before appearing.

*Look. Remember. Live.*
