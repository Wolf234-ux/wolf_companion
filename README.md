# Wolf Companion

A private AI companion that runs entirely on your device, with optional
account sign-in so your conversations follow you across devices.

## Try it live

Open this on your phone or computer:

```
https://wolf234-ux.github.io/wolf_companion/
```

The first time you sign in, your browser downloads the AI model (a few
hundred MB) and caches it locally. After that first load, it's fast — and
the model itself never needs to leave your device again.

## How it works

- **Chat & AI**: the language model runs directly in your browser using
  [WebLLM](https://github.com/mlc-ai/web-llm) (WebGPU-accelerated). All
  message generation happens locally on your device's own GPU — the AI
  provider never sees your conversations.
- **Accounts**: sign-in is handled by [Firebase Authentication](https://firebase.google.com/products/auth)
  (email/password or Google sign-in). This lets you access the same
  companion and conversation history from more than one device.
- **Memory**: your conversation history is saved to
  [Cloud Firestore](https://firebase.google.com/products/firestore),
  scoped privately to your account. Firestore security rules ensure only
  you can read or write your own conversation data — see `PRIVACY.md`
  for details.
- **Installable**: it's a Progressive Web App (PWA) — open it in Chrome,
  tap "Add to Home Screen" / "Install app," and it behaves like a native
  app icon on your phone.

## Files in this repo

| File            | Purpose                                                |
|-----------------|---------------------------------------------------------|
| `index.html`    | The main app — chat UI, auth, on-device model loading    |
| `sw.js`         | Service worker, enables offline support for the app shell|
| `manifest.json` | PWA config (name, icons, display mode)                  |
| `icon-192.png`  | App icon (small)                                         |
| `icon-512.png`  | App icon (large)                                         |

## Requirements

- A browser with WebGPU support (recent Chrome on Android, desktop Chrome/Edge).
- An internet connection for sign-in and the first-time model download.
  Chat itself works offline once the model is cached, though memory sync
  requires connectivity.

## Status

Early-stage project. Known limitations:

- Personality is currently defined by a single system prompt inside `index.html`.
- First-load download time (~1-3 min) is a known UX tradeoff of running
  the model on-device instead of via a cloud API.
- WebGPU support varies by device; browsers without it will show a
  message rather than fail silently.

## License

Not yet decided / add your preferred license here.
