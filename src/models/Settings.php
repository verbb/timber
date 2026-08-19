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
    public mixed $includedLogFiles = null;
    public mixed $excludedLogFiles = [];


    // Public Methods
    // =========================================================================

    public function includedStems(): array
    {
        return self::normalizeStemList($this->includedLogFiles);
    }

    public function excludedStems(): array
    {
        return self::normalizeStemList($this->excludedLogFiles);
    }

    public function getIncludedLogFileRows(): array
    {
        return self::stemRows($this->includedStems());
    }

    public function getExcludedLogFileRows(): array
    {
        return self::stemRows($this->excludedStems());
    }


    // Protected Methods
    // =========================================================================

    protected function defineRules(): array
    {
        $rules = parent::defineRules();

        $rules[] = [['paginationLimit', 'socketPort'], 'integer', 'min' => 0];

        return $rules;
    }


    // Private Methods
    // =========================================================================

    private static function normalizeStemList(mixed $value): array
    {
        if ($value === null || $value === '' || $value === []) {
            return [];
        }

        if (is_string($value)) {
            $value = preg_split('/[\r\n,]+/', $value) ?: [];
        }

        if (!is_array($value)) {
            return [];
        }

        $stems = [];

        foreach ($value as $row) {
            if (is_string($row)) {
                $stem = trim($row);
            } elseif (is_array($row)) {
                $stem = trim((string)($row['stem'] ?? $row[0] ?? ''));
            } else {
                continue;
            }

            if ($stem === '') {
                continue;
            }

            $stems[] = $stem;
        }

        return array_values(array_unique($stems));
    }

    private static function stemRows(array $stems): array
    {
        return array_map(static fn(string $stem): array => ['stem' => $stem], $stems);
    }
}
