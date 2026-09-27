## Status

The website and Sparkle feed serve FlicKey 0.6.0/build 78 from the canonical app repository, https://github.com/alfital2/FlicKey. The website repository now points visitors to that repository through its README, About description, and a prominent notice on its historical v0.5.0 release. Its 18 historical releases remain public pending explicit deletion confirmation.

## Recent changes

- Made the README a clear entry point to canonical downloads, release notes, source, and issues, with instructions to publish future binaries only in alfital2/FlicKey.
- Corrected the About homepage from keyflip.site to https://flickey.site and described this repository as the website/update-feed host.
- Renamed the old latest release to "v0.5.0 (historical; releases moved)" and prepended links to current releases while preserving its original notes.
- Backed up metadata and all 27 assets from the 18 historical releases in /Users/tal/Documents/flickey-oss/build/release-consolidation-2026-09-27; verified byte sizes and SHA-256 checksums before attempting removal.
- Confirmed website download links, dynamic version lookup, and the live update feed already use alfital2/FlicKey. No website or feed changes were needed.

## Open questions / blockers

- Automatic approval review rejected deleting all historical releases: the user's suggested removal was not explicit enough for broad permanent deletion of public release assets. No releases were deleted. Obtain explicit confirmation before retrying. Deletion retires old direct download links; current website downloads and update-feed URLs remain valid.
- Earlier follow-ups remain: mobile visual review and optional language-specific SEO pages.

## Next steps

1. After explicit confirmation, remove only the 18 backed-up historical releases from alfital2/flickey-app, verify none remain, and update README wording. Keep Pages, appcast.xml, and git history intact.
2. Continue publishing app assets only in alfital2/FlicKey; keep this site's feed tied to the exact signed ZIP.

_Last updated: 2026-09-27 by Codex_
