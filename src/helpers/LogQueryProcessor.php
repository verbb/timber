<?php
namespace verbb\timber\helpers;

use yii\helpers\ArrayHelper;

use DateTimeImmutable;
use Exception;

use yii2mod\query\QueryProcessor;

class LogQueryProcessor extends QueryProcessor
{
    // Protected Methods
    // =========================================================================

    protected function applyOrderBy(array $data, $orderBy): array
    {
        if (empty($orderBy) || !array_key_exists('datetime', $orderBy)) {
            return parent::applyOrderBy($data, $orderBy);
        }

        $columns = array_keys($orderBy);
        $columns[array_search('datetime', $columns, true)] = static function(array $log): float {
            if (empty($log['datetime'])) {
                return -INF;
            }

            try {
                // Preserve the displayed timestamp while comparing offsets and fractions.
                return (float)(new DateTimeImmutable($log['datetime']))->format('U.u');
            } catch (Exception) {
                return -INF;
            }
        };

        ArrayHelper::multisort($data, $columns, array_values($orderBy));

        return $data;
    }
}
