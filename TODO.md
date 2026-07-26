# Wolf Companion — To-Do List

## In progress / just done
- [x] Firebase project created, Firestore + Auth enabled
- [x] Email/password sign-in working
- [x] Google Sign-In added (switched to redirect flow for mobile)
- [ ] **Verify Google Sign-In actually works now that the domain was added** ← testing now
- [x] Conversation memory syncs to Firestore per account
- [x] Model upgraded to 1.5B for better response quality
- [x] README.md / PRIVACY.md updated to reflect accounts + Firestore

## Cleanup (Option A — do first, foundational)
- [ ] Cap conversation history length so it doesn't grow forever and
      overflow the model's context window (keep last N messages, or
      summarize older ones)
- [ ] Add a working "Delete my account" button in the app (removes
      Firestore data + Firebase auth account) — PRIVACY.md currently
      promises this but it doesn't exist yet
- [ ] Add a basic Terms of Service (TOS.md)
- [ ] Double check Firestore free-tier (Spark plan) quota limits so we
      know when/if it's time to consider Blaze (pay-as-you-go)

## Bigger feature (Option B — after cleanup)
- [ ] Build "memory summary" personalization:
      - After each session/exchange, extract key facts (interests, name,
        ongoing topics) into a short profile
      - Inject that summary into the system prompt each session
      - Light proactive suggestions based on patterns noticed
      - Note: this is summarization/prompting, not real model retraining

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

## Known limitations (accepted for now, not urgent)
- First-load download (~1GB) is a real UX cost of the on-device approach
- WebGPU support varies by device — CPU/WASM fallback used for reliability
- No email verification enforced on sign-up
