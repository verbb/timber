<?php
namespace verbb\timber\models;

use craft\base\Model;

class Settings extends Model
{
    // Properties
    // =========================================================================

    public int $paginationLimit = 100;
    public int $socketPort = 8085;
    public bool $enableRealTimeUpdates = false;


    // Protected Methods
    // =========================================================================

    protected function defineRules(): array
    {
        $rules = parent::defineRules();

        $rules[] = [['paginationLimit', 'socketPort'], 'integer', 'min' => 0];

        return $rules;
    }
}
