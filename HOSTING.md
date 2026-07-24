# Hosting Your Companion Online (GitHub Pages — free, phone-friendly)

You don't need Termux or a computer for this part — it's done entirely through
GitHub's website in your phone browser.

## Steps

1. Go to https://github.com and create a free account if you don't have one.

2. Tap the "+" icon (top right) → "New repository".
   - Name it something like `your-companion`
   - Set it to Public
   - Do NOT initialize with a README (we're uploading our own files)
   - Create the repository

3. On the new (empty) repo page, tap "uploading an existing file"
   (a link shown on the empty repo page).

4. Upload these 5 files (rename as needed so filenames match exactly):
   - chat.html
   - sw.js
   - manifest.json
   - icon-192.png
   - icon-512.png

5. Scroll down, tap "Commit changes".

6. Go to the repo's Settings tab → Pages (in the left sidebar).
   - Under "Source", choose "Deploy from a branch"
   - Branch: main, folder: / (root)
   - Save

7. Wait 1-2 minutes. GitHub will show a URL like:
   https://yourusername.github.io/your-companion/chat.html

   That's your live, public URL. Anyone can open it — no server, no
   Termux, nothing running on your phone required. The model downloads
   into THEIR browser when they visit.

## Important notes

- GitHub Pages only serves static files (HTML/JS/images) — which is exactly
  what this app is, so it's a perfect fit. No backend needed since the AI
  runs entirely client-side via WebGPU/WASM.

- HTTPS is automatic on GitHub Pages, which is required for WebGPU and
  service workers to work properly (they refuse to run on plain HTTP,
  except localhost).

- Once live, visitors can "Add to Home Screen" from their own phones to
  install it as an app, same as we tested locally.

- Free tier limits: GitHub Pages is fine for this kind of app (static
  files only, no per-user backend costs since nothing runs on your
  server — all inference happens on each visitor's own device).
