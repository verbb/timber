# Permissions

Timber's permissions decide which log files each person can read in the Logs utility, and who can download or delete them. A developer looking after the site might see every log, while a support team member might only need the `queue` log to check why a job failed. Set them in **Settings → Users → User Groups**, or on an individual user's **Permissions** tab.

Timber doesn't have its own control panel section. It works inside Craft's Utilities, so the **Logs** permission listed under Craft's **Utilities** heading opens it. Timber's own permissions are listed under the **Timber** heading.

| Permission | What It Allows |
| --- | --- |
| Logs (under **Utilities**) | Open the Logs utility. It doesn't show any log files on its own. |
| View all log files | Read every log file Timber shows, including log files created later. |
| View “{file}” logs | Read the log files for one stem, such as **View “web” logs**, when **View all log files** isn't given. |
| Download logs | Download a log file, or use **Download all logs**, for the files they can read. |
| Delete logs | Delete a log file, or use **Delete all logs**, for the files they can read. |

Timber adds one **View “{file}” logs** permission for each [stem](docs:feature-tour/logs) it finds in `storage/logs`, such as `web`, `queue` and `phperrors`, plus any plugin logs. Dated and rotated files belong to their stem, so **View “web” logs** covers `web-2026-08-19.log` and `web.log.1.gz` too. The list is built from the files on disk each time the permissions are shown, so a log that hasn't been written yet doesn't have a permission until its first file appears.

Everyone using Timber needs the **Logs** utility permission and at least one view permission. Someone with the utility but no view permission sees no logs at all. **View all log files** includes logs that appear later, so to limit a group to certain files, leave it off and tick the per-file permissions instead. **Download logs** and **Delete logs** only apply to files the person can already read.

Admins can read, download and delete every log that the `includedLogFiles` and `excludedLogFiles` settings allow. Those settings apply to everyone, admins included, and permissions then narrow the list further for everyone else. Timber's settings are only available to admins.

Log files can hold personal data, request details and secrets, so give view permissions only to the people who need them, and prefer per-file permissions where a whole-site view isn't needed. Deleting a log can't be undone, so keep **Delete logs** for whoever looks after the server. The [Logs](docs:feature-tour/logs) page covers the utility and the include and exclude settings.
