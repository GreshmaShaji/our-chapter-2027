# Greshma & Alan — Wedding Invitation Website

A single-page, mobile-first wedding invitation site. Ivory & gold theme, countdown timer, event details with maps, photo gallery, and an RSVP form.

## Before you launch

1. **RSVP form** — the form currently points to a placeholder Formspree endpoint.
   - Go to https://formspree.io, sign up free (50 submissions/month on the free plan).
   - Create a new form, copy the form endpoint (looks like `https://formspree.io/f/xxxxabcd`).
   - Open `index.html`, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace `YOUR_FORM_ID` with your real ID.
   - RSVP responses will show up in your Formspree dashboard and can be emailed to you automatically.

2. **Photos** — the gallery currently shows elegant placeholder monograms. To add real photos:
   - Drop image files into the `images/` folder.
   - In `index.html`, replace a `<div class="gallery-item">...</div>` block with:
     ```html
     <div class="gallery-item" style="background-image:url('images/your-photo.jpg'); background-size:cover; background-position:center;"></div>
     ```

3. **Double-check the venue names** in the Google Maps links/embeds resolve correctly on your phone — search terms used were "St. Stephens Auditorium Pathanamthitta", "St. Marys Orthodox Church Othera", and "Manimala Parish Hall Othera". If Maps doesn't pinpoint them exactly, replace the `q=` value in each `<iframe>` src and the `query=` value in each "Open in Google Maps" link with the exact place name or a maps link you trust.

## Deploying for free on GitHub Pages

1. Create a new **public** GitHub repository named `our-chapter-2027` (kept generic on purpose — it doesn't reveal your names in the repo listing or URL).
2. From this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Wedding invitation site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/our-chapter-2027.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → main → / (root)** → Save.
4. Your site will be live at `https://<your-username>.github.io/our-chapter-2027/` within a couple of minutes.

> **Note on privacy:** the repo *name* being generic only keeps it from showing up if someone browses your GitHub profile or searches repo names. The live site itself is still a public URL — anyone who has the link (or guesses it) can open it, since GitHub Pages on the free plan requires the repo to be public. Only share the link with people you want to invite, and avoid posting it anywhere publicly indexed (like a public social media post) if you want to keep it low-key.

### Using your own domain (optional, still free hosting)
If you buy a custom domain later, add a `CNAME` file in this folder containing just your domain (e.g. `greshmaandalan.com`), then point your domain's DNS to GitHub Pages per [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Local preview

Just open `index.html` in a browser, or run a tiny local server from this folder:
```bash
python3 -m http.server 8000
```
then visit `http://localhost:8000`.
