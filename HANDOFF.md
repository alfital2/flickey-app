## Status

The site is prepared for FlicKey 0.6.0/build 78, with the Sparkle update feed pointing to the signed, notarized GitHub ZIP and the footer showing v0.6.0. The app release passed 575 unit tests, 5 conversion UI tests, and 6 tests verifying trial enforcement in the exact signed release. GitHub Pages deploys pushes to main; live deployment verification is the remaining release step.

## Recent changes

- Updated appcast version, build, download URL, signature, byte length, and publication timestamp for the 0.6.0 update.
- Updated the static footer fallback so it matches the release even before the dynamic version lookup completes.
- App release verification confirmed the 30-day trial, expired-feature gating, ignored QA unlock flags, and ongoing expiry. Existing grandfathered access is preserved.

## Open questions / blockers

- Confirm the Pages deployment serves build 78 before announcing the update feed as live.
- Earlier non-release follow-ups remain: mobile visual review and optional language-specific SEO pages.

## Next steps

1. Verify the deployed appcast and download links after this push.
2. Keep feed version/signature/length tied to the exact published ZIP for future releases.

_Last updated: 2026-09-26 by Codex_
