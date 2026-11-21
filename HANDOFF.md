## Status

Published 2026-11-21: the Oct 17 Mac copy corrections (index, terms, privacy) together with the FlicKey for Windows 0.1.0 beta: a "Download for Windows" button beside the Mac one (both with their details stacked below), Windows sections in privacy.html and terms.html, terms §5 "one Mac at a time" (licenses are now 1 activation), and `appcast-windows.xml` (the Windows update feed, release win-v0.1.0 on alfital2/FlicKey, a pre-release so the Mac stays GitHub's latest).

## Recent changes

- Replaced the homepage's "one network call"/"no server" claims and Terms §6 with Sparkle update checks at `flickey.site/appcast.xml` (GitHub Pages), GitHub downloads, and Lemon Squeezy activation, revalidation, and deactivation. Licensing sends a key plus Mac name (activation) or instance ID (validation/deactivation); update requests include app/Sparkle versions and normal request metadata. Neither includes typing content.
- Made the 30-day trial start at first launch; specified which features pause and that the purchased key must be activated. Removed the false free-regardless rationale from §4 without changing refund terms. Replaced the unsupported "most people" contribution claim with "suggested" at the same price.
- User explicitly approved documenting the implemented grandfather cutoff: first launch strictly before 2026-07-24 12:00 UTC (end of 23 July in UTC−12). Included the saved-preferences recovery exception. User clarified §5 means sharing the download link, not redistributing the app; copy now says that.
- Privacy now describes learned word exceptions, domain/layout memory, Keychain trial/license data, offline-tolerant revalidation, optional diagnostics and reviewed blocked-word sharing. Removed obsolete sandbox and Mac App Store claims. Distinguishes app traffic from GitHub Pages, Google Fonts, GitHub's website version lookup, and Lemon Squeezy browser checkout. No analytics script was found in source or live homepage HTML.
- Evidence: sibling `FlicKey/Sources/{Entitlement,TrialRecovery,TrialManager,AppDelegate,LicenseStore,LemonSqueezy,Updater,DiagnosticConsent,ReportComposer,DiagnosticSink,BlockedWordsSharing,BlockedWordsSharingController,SiteMemoryStore,AutoSwitchExceptions}.swift`, `Resources/Info.plist`, pinned Sparkle source, this site's `engine.js`/`appcast.xml`, and live HTML/feed. Relevant entitlement/licensing/network logic was cross-checked against the shipped `v0.6.0` tag.
- Validation: 27 existing entitlement/recovery/license-parser/reminder tests passed in a standalone XCTest runner; HTML structure/local links/anchors, preserved prices/styles/scripts/refund rules, JS syntax, and stale-claim searches passed. Chromium checks and screenshots at 1440×1000 and 390×844 covered all three pages and expanded permission answers; no overflow or JS errors. Static site: no package/build/test script. Artifacts and logs: `/Users/tal/Documents/FlicKey/build/website-copy-review-20261017/`.
- User asked to leave `/v/` archived designs alone. They are gitignored and the checked live variant URL returns 404. No standalone FAQ page exists; homepage permission answers were reviewed.

## Open questions / blockers

- No unresolved claim decisions for this copy review. Publication still requires the user's approval.
- Earlier release-cleanup task remains separate: historical releases in `alfital2/flickey-app` were backed up under `/Users/tal/Documents/flickey-oss/build/release-consolidation-2026-09-27`; deleting those public assets still needs explicit approval. Do not delete them as part of this copy change.

## Next steps

1. Review the local three-page copy diff and screenshots; publish only after explicit approval.
2. Continue publishing app assets only in `alfital2/FlicKey`; keep this site's feed tied to the exact signed ZIP.

_Last updated: 2026-11-21 by Claude Opus 5.5 (Claude Code)_
