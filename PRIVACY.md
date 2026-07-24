# Privacy

Wolf Companion is designed to keep everything on your device.

## What we collect

Nothing. There is no backend server for this app. There is no analytics,
no tracking, no account system, and no data transmission of any kind
related to your conversations.

## How the AI works

When you open the app, your browser downloads an open-weight AI model
(from Hugging Face / MLC-AI's public model repositories) and runs it
locally using your device's own GPU (via WebGPU). All conversation text,
inference, and model execution happen entirely within your browser tab.

## What does leave your device

- The one-time download of the model weights themselves, from the
  public hosting service (Hugging Face or MLC-AI's CDN) — this is just
  downloading files, not sending any of your data anywhere.
- Loading the app page itself, from wherever it's hosted (e.g. GitHub Pages).

Once the model is cached in your browser, the app can be used fully
offline, and no further network requests are needed for normal use.

## Third-party services involved

- **GitHub Pages** (or wherever this app is hosted) — serves the static
  app files. Standard web server logs may apply per GitHub's own privacy
  policy, unrelated to your conversations with the AI.
- **Hugging Face / MLC-AI CDN** — hosts the model weight files that your
  browser downloads once. No conversation data is sent here, only the
  initial model download request.

## Questions

This is an early-stage independent project. If you have privacy questions,
[open an issue on the GitHub repository](../../issues).
