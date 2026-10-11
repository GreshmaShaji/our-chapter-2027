# Greshma & Alan — Wedding Invitation Website

A single-page, mobile-first wedding invitation site. Ivory & gold theme, countdown timer, event details with maps, background music, and a public wishes wall.

## Before you launch

1. **Wishes wall** — needs a free Firebase project to store and share messages with every visitor in real time.
   - Go to https://console.firebase.google.com and create a new project (free Spark plan is enough).
   - In the project, go to **Build → Firestore Database → Create database** — start in **production mode**.
   - Once created, go to the **Rules** tab and replace the rules with:
     ```
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /wishes/{wishId} {
           allow read: if true;
           allow create: if request.resource.data.name is string
                         && request.resource.data.name.size() > 0
                         && request.resource.data.name.size() < 60
                         && request.resource.data.message is string
                         && request.resource.data.message.size() > 0
                         && request.resource.data.message.size() < 500;
           allow update, delete: if false;
         }
       }
     }
     ```
     This lets anyone read and add a wish, but nobody can edit or delete one from the site itself (you can still delete inappropriate entries yourself from the Firebase console).
   - Back in the project overview, click the **`</>` (web) icon** to register a web app, then copy the `firebaseConfig` object it gives you.
   - Open `js/wishes.js` and paste your values over the placeholder `firebaseConfig` object near the top of the file.
   - That's it — wishes submitted by any visitor will now appear live for everyone who opens the site.

2. **Background music** — currently plays `Music/sabhayam-thiru-sabhayam-orthodox_N9Rx82qS.mp3` on load (with a mute/unmute button). Swap the file or update the `src` in `index.html`'s `<audio id="bg-music">` tag if you'd rather use a different track.

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
