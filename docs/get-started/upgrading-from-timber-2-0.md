# Upgrading from Timber 2.0

Review log access before deploying the update. Timber 2.0 grants file viewing through access to the Logs utility; the updated permission system also requires an explicit file-view permission for non-admin users.

## Log-Viewing Permissions

After updating, visit **Settings → Users → User Groups** for each group that uses Timber. Keep access to the Logs utility enabled, then grant **View all log files** to preserve access to every configured log, including files created later. To limit a group, leave that permission unchecked and grant the file-specific permissions for the required file stems instead.

If you configured file-specific grants in an earlier beta, re-save those grants after updating.

A group with no file-view permission sees no log files. Download and delete permissions remain separate and only apply to files the user can view. Site-wide include/exclude settings also apply to administrators.

Sign in as a representative non-admin user and check the available files, an individual log and any permitted download or delete actions before considering the upgrade complete.
