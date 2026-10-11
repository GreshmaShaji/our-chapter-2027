# Greshma & Alan — Wedding Invitation Website

A single-file, mobile-first wedding invitation site (everything — HTML, CSS, and JS — lives in `index.html`). Ivory & gold theme, split-screen hero with photo, live countdown, and a celebrations section.

## Before you launch

This version is a simpler starting point than earlier iterations — a few things are still placeholders:

1. **Venue details** — the Engagement card says "Venue details coming soon" and the Wedding card just says "Othera, Kerala". Fill in the real venue names, addresses, and times directly in the `<section class="events">` block in `index.html`.
2. **RSVP** — currently just says "RSVP registration coming soon." You'll need to wire up an actual way for guests to respond (a form service, a shared form, or just your phone number/WhatsApp).
3. **Ceremony time** — the countdown currently counts down to midnight IST on Jan 31, 2027. Update the `weddingDate` line near the bottom of `index.html` once your ceremony time is confirmed, e.g. `"2027-01-31T11:00:00+05:30"`.
4. **Photo** — the hero uses `images/A4639B51-C697-4DE7-91DC-55721DA076B6.PNG`. Swap in a different file (and update the `url(...)` in the `.hero-photo` CSS rule) if you'd like to use a different photo.

## Deploying for free on GitHub Pages

1. From this folder, commit and push your changes:
   ```bash
   git add .
   git commit -m "Update wedding site"
   git push
   ```
2. On GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)** → Save (only needed once, if not already set up).
3. Your site will be live at `https://<your-username>.github.io/our-chapter-2027/` within a couple of minutes.

> **Note on privacy:** the repo name being generic only keeps it from showing up if someone browses your GitHub profile or searches repo names. The live site itself is still a public URL — anyone who has the link can open it, since GitHub Pages on the free plan requires the repo to be public. Only share the link with people you want to invite.

### Using your own domain (optional, still free hosting)
If you buy a custom domain later, add a `CNAME` file in this folder containing just your domain (e.g. `greshmaandalan.com`), then point your domain's DNS to GitHub Pages per [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Local preview

Just open `index.html` directly in a browser — no server needed, since everything is a single self-contained file.
