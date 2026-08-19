# Changelog

## Unreleased

### Added
- Add per-log-file view permissions, plus optional include/exclude lists, so users can be limited to specific log files ([#3](https://github.com/verbb/timber/issues/3)).
- Add a `modifyLogFiles` event so modules can add or remove log files from the catalog.
- Discover rotated, compressed, and `.txt` log files in `@storage/logs` (for example `web.log.1.gz`, `web.log-20260325.gz`).
- Parse common log line shapes by content (Craft 5, Craft 3, Monolog, Formie, bracketed timestamps, bare datetime). Unmatched lines stay visible instead of being dropped.
- Add a `modifyLogParsers` event so modules can register custom line parsers and line-start patterns per log file.

### Changed
- Rebuild the Logs utility UI on [Plugin Kit](https://docs.verbb.io/plugin-kit/web/) (web components). Existing log viewing, filtering, search, pagination, download/delete, and real-time updates are preserved.
- The log file picker is now a searchable combobox.
- Improve accessibility, arrow-key, typeahead, and Enter/Space navigation.
- Improve responsive handling for the Logs utility.

### Fixed
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
