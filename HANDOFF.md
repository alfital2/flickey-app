## Status

Launch-prep pass for Hacker News / Product Hunt / r/macapps is live on
flickey.site. The site no longer claims to be open source (it is source
available under the custom FlicKey License), both legal pages are reachable from
every footer, support has moved to `support@flickey.site`, and the 01/02/03
section numbering is gone. Deployed via GitHub Pages on push to `main`.

## Recent changes

- Replaced all three "open source" claims. The repo ships a licence that
  restricts commercial redistribution, so the claim was wrong on the facts, and
  the mismatch is the specific thing that derails HN launch threads. The
  `.oss-pill` CSS class was renamed too, so nothing in the file still says it.
- Linked `privacy.html` from the footer. It was a complete policy page that
  nothing on the site pointed at — a moderator reviewing the site would have
  concluded it did not exist. Both legal pages now also cross-link each other.
- Support address moved off Gmail. `terms.html` is where refunds get requested,
  so a throwaway-looking address there costs real money and credibility.
  Namecheap forwarding was already configured (MX -> `eforward*`); the alias is
  free and now live.
- Dropped the `01 - See it, try it` style section labels — they read as
  machine-written. The Pricing one took its whole `sec-head` wrapper with it,
  since the label was its only child and an empty div kept the margin.

## Open questions / blockers

- The mobile pass (393px) was never actually confirmed. Chrome's window resize
  reported success but the viewport stayed at 1382px and screenshots came back
  stale, so the footers were verified structurally (DOM text, hrefs, no
  horizontal overflow) rather than by eye. Worth a real look before posting.
- The footer version badge is hardcoded `v0.3.6` in the markup; `engine.js`
  overwrites it at runtime from the appcast. Harmless, but it is what a
  no-JS reader sees.
- `taltools.site` uses `support@flickey.site` as its contact address. It reads
  oddly on a six-app site — Padoo and Tally users emailing a FlicKey address.

## Next steps

1. Tag proper GitHub releases with real changelogs (repo topics, About and
   homepage are already set). Visible incremental commits are the credibility
   signal r/macapps regulars check for.
2. Eyeball both legal pages and the homepage at 393px.
3. SEO landing pages, one per query, Hebrew and Russian first — those have
   almost no competition and the highest purchase intent. To be specced
   separately.

_Last updated: 2026-09-07 by Claude Opus 5 (Claude Code)_
