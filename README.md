# Greshma & Alan — Wedding Invitation Website

A two-page, mobile-first wedding invitation site:

- **`index.html`** — home page: top navbar, split-screen hero (your photo + an invitation card with a live countdown), and a celebrations section.
- **`story.html`** — "Our Story" page: a sticky photo panel on the left (stays in view while you scroll) with your golden-hour photo, and a scrolling Our Story / Celebrations panel on the right.

Both pages link to each other via the nav menu (Home ↔ Our Story).

## Before you launch

A few things are still placeholders:

1. **Venue details** — the Engagement card on `index.html` says "Venue details coming soon" and the Wedding card just says "Othera, Kerala". Fill in the real venue names, addresses, and times in the `<section class="events">` block.
2. **RSVP** — currently just says "RSVP registration coming soon." on `index.html`. You'll need to wire up an actual way for guests to respond (a form service, a shared form, or just your phone number/WhatsApp).
3. **Ceremony time** — the countdown on `index.html` currently counts down to midnight IST on Jan 31, 2027. Update the `weddingDate` line near the bottom of the file once your ceremony time is confirmed, e.g. `"2027-01-31T11:00:00+05:30"`.
4. **Our Story answers** — the six Q&A entries on `story.html` (`How did you two meet?`, etc.) are placeholder text — fill in your real answers in the `<div class="story-questions">` block.

## Photos

- `index.html` hero uses `images/A4639B51-C697-4DE7-91DC-55721DA076B6.PNG`.
- `story.html` sticky photo uses `images/golden-hour-old-town-selfie.png`.

Swap either by changing the `url(...)` in the relevant CSS file (`index.html`'s inline `<style>` for the home page, `story.css` for the Our Story page).

## Deploying for free on GitHub Pages

1. From this folder, commit and push your changes:
   ```bash
   git add .
   git commit -m "Update wedding site"
   git push
   ```
2. On GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)** → Save (only needed once, if not already set up).
3. Your site will be live at `https://<your-username>.github.io/our-chapter-2027/` within a couple of minutes, with the Our Story page at `.../story.html`.

> **Note on privacy:** the repo name being generic only keeps it from showing up if someone browses your GitHub profile or searches repo names. The live site itself is still a public URL — anyone who has the link can open it, since GitHub Pages on the free plan requires the repo to be public. Only share the link with people you want to invite.

### Using your own domain (optional, still free hosting)
If you buy a custom domain later, add a `CNAME` file in this folder containing just your domain (e.g. `greshmaandalan.com`), then point your domain's DNS to GitHub Pages per [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Local preview

Just open `index.html` or `story.html` directly in a browser — no server needed.
