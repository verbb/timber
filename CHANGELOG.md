# Changelog

## 2.1.1 - 2026-10-02

### Changed
- Updated the required version of `verbb/base` to 3.0.19.

## 2.1.0 - 2026-09-29

### Added
- Add per-log-file view permissions, plus optional include/exclude lists, so users can be limited to specific log files ([#3](https://github.com/verbb/timber/issues/3)).
- Discover rotated, compressed, and `.txt` log files in `@storage/logs` (for example `web.log.1.gz`, `web.log-20260325.gz`).
- Parse common log line shapes by content (Craft 5, Craft 3, Monolog, Formie, bracketed timestamps, bare datetime). Unmatched lines stay visible instead of being dropped.
- Add a `modifyLogFiles` event so modules can add or remove log files from the catalog. Nested and event-added external logs are available for viewing and download, but not deletion.
- Add a `modifyLogParsers` event so modules can register custom line parsers and line-start patterns per log file.

### Changed
- Non-admin users require an explicit log-view permission as well as access to the Logs utility. Review user groups when upgrading; see [Upgrading from Timber 2.0](https://verbb.io/craft-plugins/timber/docs/get-started/upgrading-from-timber-2-0).
- Rebuild the Logs utility UI on [Plugin Kit](https://docs.verbb.io/plugin-kit/web/) with a searchable log picker and improved accessibility and responsive behaviour.
- Improve large-log performance with bounded reads, parsing, caching, filtering, pagination, and streamed downloads.
- Improve real-time updates for rotated, replaced, new, truncated, and removed log files, and load the live-update connection only when enabled.
- Route plugin settings through the plugin’s authorized settings controller.

### Fixed
- Fixed a high-severity object injection vulnerability.
- Fixed a low-severity improper link resolution vulnerability.
- Fixed a low-severity information disclosure vulnerability.
- Reject WebSocket ports outside the valid range.
- Report unreadable log files and deletion failures instead of presenting them as empty or successfully deleted.

## 2.0.5 - 2026-09-13

### Changed
- Normalize plugin settings.

## 2.0.4 - 2025-11-06

### Fixed
- Fix Craftagram log support.

## 2.0.3 - 2025-07-18

### Changed
- When deleting all logs, hidden files like `.gitignore` and `.gitkeep` are retained.

## 2.0.2 - 2024-09-07

### Added
- Add Craft Teams support for permissions.

### Changed
- Update English translations.

## 2.0.1 - 2024-05-26

### Fixed
- Fix an error with `verbb/parallel-process`.

## 2.0.0 - 2024-05-13

### Changed
- Now requires PHP `8.2.0+`.
- Now requires Craft `5.0.0+`.

## 1.0.4 - 2025-07-18

### Changed
- When deleting all logs, hidden files like `.gitignore` and `.gitkeep` are retained.
- Update English translations.

## 1.0.3 - 2023-12-28

### Fixed
- Fix lack of sanitizing of log file content.

## 1.0.2 - 2023-05-27

### Added
- Add custom logs for `ondemand`.
- Add support for Sprig log files.
- Add basic support for Craft 3 logs.

### Fixed
- Fix an error when trying to read Craft 3 log files.

## 1.0.1 - 2023-02-28

### Fixed
- Fix dev dependancies.

## 1.0.0 - 2023-02-22

### Added
- Initial release
