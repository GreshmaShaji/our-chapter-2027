# Greshma & Alan — Wedding Invitation Website

A single continuous-scroll wedding invitation site. A sticky photo panel sits on the left (stays pinned in view) while the right side scrolls through: the wedding invitation card with a live countdown, Our Story (Q&A), Celebrations, and an RSVP note. The left photo crossfades slowly from your arch photo to the golden-hour photo as you scroll into the Our Story section.

## Before you launch

A few things are still placeholders:

1. **Venue details** — the Engagement card says "Venue details coming soon" and the Wedding card just says "Othera, Kerala". Fill in the real venue names, addresses, and times in the `<section class="events">` block in `index.html`.
2. **RSVP** — currently just says "RSVP registration coming soon." You'll need to wire up an actual way for guests to respond (a form service, a shared form, or just your phone number/WhatsApp).
3. **Ceremony time** — the countdown currently counts down to midnight IST on Jan 31, 2027. Update the `weddingDate` line near the top of `script.js` once your ceremony time is confirmed, e.g. `"2027-01-31T11:00:00+05:30"`.
4. **Our Story answers** — the six Q&A entries (`How did you two meet?`, etc.) are placeholder text — fill in your real answers in the `<div class="story-questions">` block in `index.html`.

## Photos

- First photo (shown until you scroll into Our Story): `images/A4639B51-C697-4DE7-91DC-55721DA076B6.PNG`
- Second photo (crossfades in once Our Story is in view): `images/golden-hour-old-town-selfie.png`

Swap either by changing the `background-image: url(...)` on `.photo-layer-1` / `.photo-layer-2` in `style.css`. The crossfade trigger itself is in `script.js` (an `IntersectionObserver` watching the `#story` section).

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

Just open `index.html` directly in a browser — no server needed.
