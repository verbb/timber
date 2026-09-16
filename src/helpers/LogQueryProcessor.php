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
        if (empty($orderBy) || (!array_key_exists('datetime', $orderBy) && !array_key_exists('message', $orderBy))) {
            return parent::applyOrderBy($data, $orderBy);
        }

        $columns = array_keys($orderBy);

        if (array_key_exists('datetime', $orderBy)) {
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
        }

        if (array_key_exists('message', $orderBy)) {
            // Compare the visible text without changing escaped response content.
            $columns[array_search('message', $columns, true)] = static fn(array $log): string => htmlspecialchars_decode($log['message'] ?? '', ENT_QUOTES);
        }

        ArrayHelper::multisort($data, $columns, array_values($orderBy));

        return $data;
    }
}
