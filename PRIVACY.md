# Privacy

Wolf Companion is designed to keep your conversation data private, while
still letting you sign in and sync your companion across devices.

## What we collect

- **Account info**: when you sign up, Firebase Authentication stores your
  email address (or your Google account identifier, if you use "Continue
  with Google") to identify your account. We don't collect anything
  beyond what's needed to authenticate you.
- **Conversation history**: your chat messages are saved to a private
  Cloud Firestore document tied to your account, so your companion
  remembers past conversations when you sign in again — including on a
  different device.
- **Nothing else**: no analytics, no ad tracking, no selling of data to
  third parties.

## How the AI works

The AI model itself downloads once from a public model repository
(Hugging Face / MLC-AI) and runs entirely inside your browser using your
device's own GPU (via WebGPU). Message generation happens locally — the
model provider never sees your prompts or replies. Only the resulting
conversation text is saved to Firestore for memory purposes, as
described above.

## Who can access your data

Firestore security rules restrict access so that **only your signed-in
account** can read or write your own conversation document. Nobody else
— including other users of this app — can access your data. The current
rule is:

```
match /conversations/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

## Third-party services involved

- **Firebase (Google)** — handles authentication and stores your
  conversation history. Subject to [Google's Privacy Policy](https://policies.google.com/privacy).
- **GitHub Pages** — serves the static app files you load. Standard web
  server logs may apply per GitHub's own privacy policy, unrelated to
  your conversations with the AI.
- **Hugging Face / MLC-AI CDN** — hosts the model weight files your
  browser downloads once. No conversation data is sent here, only the
  initial model download request.

## Deleting your data

Currently there isn't an in-app "delete my account" flow yet. If you'd
like your data removed, [open an issue on the GitHub repository](../../issues)
and it will be handled manually until a self-serve option is added.

## Questions

This is an early-stage independent project. If you have privacy
questions, [open an issue on the GitHub repository](../../issues).
