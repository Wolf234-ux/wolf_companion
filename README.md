# Wolf Companion

A private, offline-first AI companion that runs entirely on your device.

No servers. No accounts. No data collection. Every conversation happens
locally on your phone or computer, powered by [WebGPU](https://www.w3.org/TR/webgpu/)
and an open-weight language model running directly in your browser.

## Try it live

Open this on your phone or computer:

```
https://<your-username>.github.io/wolf_companion/
```

(Replace `<your-username>` with your actual GitHub username once Pages is enabled.)

The first time you open it, your browser will download the AI model
(a few hundred MB) and cache it locally. After that first load, it works
instantly — and even offline.

## How it works

- The chat interface (`index.html`) runs a language model directly in your
  browser using [WebLLM](https://github.com/mlc-ai/web-llm), which uses
  WebGPU to run inference on your device's own GPU.
- Nothing is sent to any server. Your conversations never leave your device.
- It's installable as a Progressive Web App (PWA) — open it in Chrome,
  tap "Add to Home Screen" / "Install app", and it behaves like a native
  app icon on your phone.

## Files in this repo

| File            | Purpose                                          |
|-----------------|---------------------------------------------------|
| `index.html`     | The main app — chat UI + on-device model loading  |
| `sw.js`         | Service worker, enables offline support           |
| `manifest.json` | PWA config (name, icons, display mode)            |
| `icon-192.png`  | App icon (small)                                  |
| `icon-512.png`  | App icon (large)                                  |

## Requirements

- A browser with WebGPU support (recent Chrome on Android, desktop Chrome/Edge).
- If WebGPU isn't available, the app will show a message rather than fail silently.

## Status

This is an early prototype. Known limitations:

- No persistent memory between sessions yet (conversation resets on reload).
- Personality is defined by a single system prompt inside `index.html`.
- First-load download time (~1-3 min) is a known UX tradeoff of running
  the model fully on-device instead of via a cloud API.

## License

Not yet decided / add your preferred license here.
