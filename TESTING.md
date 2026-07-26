# Testing checklist — Your Companion

This is a static client-side app with no backend to unit-test against, so
verification is a mix of manual QA (do this on your phone against the
live URL) and a few checks you can run against the Firebase Console.
Work through these before/after any deploy.

## 1. Model loading & retry (fixes the "stuck on network error" bug)
- [ ] Fresh load on good WiFi → model downloads to 100%, chat becomes usable
- [ ] Turn on airplane mode mid-download → error shown, "Retry loading"
      button appears within 3 attempts (not stuck forever)
- [ ] Tap "Retry loading" with network back on → succeeds
- [ ] Turn airplane mode off while the failure state is showing (don't tap
      retry) → app should auto-retry via the `online` event listener
- [ ] Reload the page after a successful load → model loads again (no
      partial/corrupt state left over from a prior failure)

## 2. Auth flows
- [ ] Sign up with a new email/password → lands in chat screen
- [ ] Sign out (confirm the confirmation dialog appears) → back to auth screen
- [ ] Sign in with wrong password → friendly error, not raw Firebase code
- [ ] Forgot password → reset email arrives
- [ ] Google Sign-In on a normal mobile browser tab → popup works
- [ ] Google Sign-In inside an in-app browser (e.g. tapping a link from
      Instagram/Gmail) → popup blocked → falls back to redirect →
      `getRedirectResult` completes sign-in on return
- [ ] Sign in on a second device with the same account → same conversation
      history and profile summary appear

## 3. Conversation memory & context capping
- [ ] Send ~50 back-and-forth messages in one session → confirm the app
      doesn't slow to a crawl or throw a context-length error from the model
- [ ] After crossing the cap, check Firestore Console: the `messages` array
      in `/conversations/{uid}` should stay bounded (~40 messages), and a
      `profile` string field should start appearing/growing
- [ ] Sign out and back in after a summarization has happened → the
      companion should still reference earlier facts (via `profile`) even
      though the raw messages were trimmed
- [ ] Confirm `profile` field never exceeds ~1500 characters after many
      summarization cycles (it should roll, not grow unbounded)

## 4. Delete account
- [ ] Account → Delete → cancel the confirm dialog → nothing happens
- [ ] Account → Delete → confirm → if prompted to re-authenticate, do so →
      account and Firestore doc both gone (check Console: Auth user list
      and `/conversations/{uid}` doc no longer exist)
- [ ] Try deleting an account that hasn't signed in recently → confirm the
      reauth prompt appears instead of a hard failure

## 5. Input handling / abuse resistance
- [ ] Paste a >4000 character message → input is capped, doesn't crash send
- [ ] Rapid-tap the send button many times → only sends at the throttled
      rate, no duplicate/garbled messages
- [ ] Paste `<script>alert(1)</script>` as a message → renders as literal
      text in the chat bubble, does **not** execute (confirms `textContent`
      usage, not `innerHTML`, is preserved everywhere messages are rendered)
- [ ] Send an empty message / only whitespace → blocked client-side

## 6. Security checks (do these in Firebase Console / browser devtools)
- [ ] Firestore Console → Rules tab → confirm the deployed rules match
      `firestore.rules` in this repo (rules are only enforced from what's
      *published*, not what's in the file — you must deploy/paste it)
- [ ] While signed in as User A, open browser devtools console and try
      `getDoc(doc(db,'conversations','<User B uid>'))` → should be denied
      ("Missing or insufficient permissions")
- [ ] Confirm no `localStorage`/`sessionStorage` usage anywhere (search the
      codebase) — none should exist per the app's design
- [ ] View page source / network tab → confirm the CSP meta tag is present
      and no console errors about blocked resources on a normal load
- [ ] Firebase Console → Authentication → Settings → Authorized domains →
      confirm `wolf234-ux.github.io` is listed (this was the earlier
      Google Sign-In root cause)

## 7. Offline / interrupted sync
- [ ] Send a message, then immediately kill network before the reply
      finishes → error shown in the chat bubble, app doesn't hang
- [ ] Send a message successfully but kill network right as it would save
      to Firestore → "⚠ Last message may not have synced" warning appears
      within ~1.5s (after the one auto-retry)
- [ ] Restore network → next successful save clears the warning

## 8. PWA / install
- [ ] Install to home screen → opens standalone, no browser chrome
- [ ] Kill and reopen the installed app → service worker serves cached
      shell instantly, then updates in the background (network-first)
- [ ] Confirm the model file itself is never found in Cache Storage
      (devtools → Application → Cache Storage) — only same-origin app
      shell files should be cached

## Known accepted limitations (not bugs)
- First load still requires a ~1GB download; there's no way around this
  with an on-device model
- No email verification enforced on sign-up (tracked in TODO.md)
- WASM/CPU inference is slower than server-side inference by design
