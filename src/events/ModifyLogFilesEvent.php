<?php
namespace verbb\timber\events;

use yii\base\Event;

class ModifyLogFilesEvent extends Event
{
    // Properties
    // =========================================================================

    /**
     * Discovered log files. Each item is `path`, plus optional `size` and `stem`.
     * Size and stem are filled in after the event if omitted.
     *
     * @var array<int, array{path: string, size?: int, stem?: string}|string>
     */
    public array $logFiles = [];
}
