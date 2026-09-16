# Changelog

## Unreleased

### Added
- Add per-log-file view permissions, plus optional include/exclude lists, so users can be limited to specific log files ([#3](https://github.com/verbb/timber/issues/3)).
- Add a `modifyLogFiles` event so modules can add or remove log files from the catalog.
- Discover rotated, compressed, and `.txt` log files in `@storage/logs` (for example `web.log.1.gz`, `web.log-20260325.gz`).
- Parse common log line shapes by content (Craft 5, Craft 3, Monolog, Formie, bracketed timestamps, bare datetime). Unmatched lines stay visible instead of being dropped.
- Add a `modifyLogParsers` event so modules can register custom line parsers and line-start patterns per log file.

### Changed
- Non-admin users require an explicit log-view permission as well as access to the Logs utility. Review user groups when upgrading; see [Upgrading from Timber 2.0](https://verbb.io/craft-plugins/timber/docs/get-started/upgrading-from-timber-2-0).
- Load the live-update connection only when realtime updates are enabled.
- Clarified optional PHP configuration with focused examples and linkable setting details.
- Rebuild the Logs utility UI on [Plugin Kit](https://docs.verbb.io/plugin-kit/web/) (web components). Existing log viewing, filtering, search, pagination, download/delete, and real-time updates are preserved.
- The log file picker is now a searchable combobox.
- Improve accessibility, arrow-key, typeahead, and Enter/Space navigation.
- Improve responsive handling for the Logs utility.
- Clarify log-reading limits, configuration, and log access in the documentation.

### Fixed
- Fixed a moderate-severity access control vulnerability.
- Bound dense log files to 100,000 retained entries, use small read buffers, and release raw entries during parsing to prevent excessive memory use.
- Refresh cached log content after rapid same-size rewrites, including changes between sampled regions.
- Continue live updates when log files are replaced or new daily files appear.
- Retain complete log entries at the exact start of a bounded read window.
- Include uncompressed dated rotations such as `web.log-20260916` in the log catalogue.
- Reject WebSocket ports outside the valid range.
- Restore live-update connections to the PHP socket server and show update notifications for empty logs without reporting an inaccurate entry count.
- Allow file-specific view permissions to be saved without granting access to every log.
- Allow log details to be expanded and collapsed with the keyboard, retaining focus after each action.
- Preserve multiline messages and stack traces when parsing log strings.
- Preserve directory names in the log picker so files with matching names remain distinguishable.
- Keep identical and similar log entries independently expandable.
- Show custom parser context in expanded log details.
- Separate native PHP error entries and sort their timestamps correctly across month boundaries.
- Preserve files with matching names from different directories in downloaded log archives.
- Report unreadable log files as errors instead of empty results or downloads.
- Report file deletion failures and retain undeleted files after partial bulk deletion.
- Clear loading and error states after deleting logs, and ignore pending reads for deleted selections.
- Preserve chosen level and category filters when searches change the available options.
- Keep raw and uncategorised entries visible when sorting, searching and changing files, and distinguish all filters from an empty selection.
- Bound individual plain and compressed log-line reads so malformed newline-free files cannot exceed the configured memory window.
- Stream bounded “Download all” archives from disk and remove their temporary ZIP files after sending.
- Scan each bounded log window once when calculating filters and pagination.
- Keep level/category filters available when parsed and raw entries are mixed, and report empty pagination ranges accurately.
- Treat log searches as literal displayed text, including `0` and escaped characters, and preserve message formatting when highlighting results.
- Keep Yii exception-chain lines (`[previous exception]`, stack traces) attached to the parent ERROR entry instead of splitting them into fake rows.

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
