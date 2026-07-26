# Wolf Companion — To-Do List

## In progress / just done
- [x] Firebase project created, Firestore + Auth enabled
- [x] Email/password sign-in working
- [x] Google Sign-In: popup with automatic redirect fallback for
      environments that block popups (in-app browsers)
- [x] Conversation memory syncs to Firestore per account
- [x] Model upgraded to 1.5B for better response quality
- [x] README.md / PRIVACY.md updated to reflect accounts + Firestore

## Cleanup (Option A — foundational) — DONE this pass
- [x] Cap conversation history length (raw history capped at 40 messages,
      only last 12 sent to the model per turn; older messages get rolled
      into a `profile` summary instead of dropped outright)
- [x] Working "Delete my account" button (Account sheet in-app) — deletes
      the Firestore document + Firebase auth account, with reauthentication
      handling for both email/password and Google-linked accounts
- [x] Basic Terms of Service (TOS.md)
- [x] Model load retry logic (3 attempts w/ backoff, manual "Retry"
      button, auto-retry on regained connectivity) — fixes the app getting
      permanently stuck on a network error
- [x] firestore.rules checked into the repo (version-controlled) with a
      defensive per-document size cap
- [x] Content-Security-Policy meta tag added
- [x] Input length cap (4000 chars) + basic client-side send throttle
- [x] Firestore save failures now surface a visible "not synced" warning
      instead of failing silently
- [x] TESTING.md — manual QA + security checklist for this and future
      changes

## Still needs a manual step (can't be done from code alone)
- [ ] **Deploy `firestore.rules` to the live Firebase project** — the file
      in this repo is not automatically enforced; paste its contents into
      Firebase Console → Firestore Database → Rules → Publish, or use the
      Firebase CLI. Until this is done, whatever is *currently published*
      in the Console is what's actually protecting user data.
- [ ] Double-check Firestore free-tier (Spark plan) quota limits in the
      Firebase Console (Usage tab) now that per-message writes happen —
      confirm current usage is well under the daily read/write caps
- [ ] Verify Google Sign-In redirect fallback in an actual in-app browser
      (e.g. tap a link from Instagram) — can't be fully verified outside
      that environment

## Bigger feature (Option B) — DONE this pass
- [x] "Memory summary" personalization: implemented as the same mechanism
      used to cap history — older messages are summarized into a rolling
      `profile` field (capped at 1500 chars) and injected into the system
      prompt every session. Proactive suggestions based on patterns are
      not yet built (kept simple/conservative for now — see note below).

## Not started / future
- [ ] Decide on monetization approach (one-time purchase vs subscription
      vs free) — still an open question from earlier in the project
- [ ] Custom domain (optional, for branding/trust once selling)
- [ ] Native Android app path (via GitHub Actions cloud build) — longer
      term, once web version is validated
- [ ] Content/safety review of the companion's system prompt and behavior
      before wider release
- [ ] Decide on app name/branding consistency (currently mixes "Your
      Companion" in-app text with "Wolf Companion" repo/marketing name)
- [ ] Proactive suggestions based on noticed patterns (deferred from the
      memory summary feature — deliberately not built yet since it needs
      its own safety/annoyance-factor review before shipping)

## Known limitations (accepted for now, not urgent)
- First-load download (~1GB) is a real UX cost of the on-device approach
- WebGPU support varies by device — CPU/WASM fallback used for reliability
- No email verification enforced on sign-up
