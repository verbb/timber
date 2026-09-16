<?php

// Pest derives its root from vendor/, which belongs to the generated Craft app.
// Point its discovery at the checkout so Pest.php, helpers and datasets load too.
require_once __DIR__ . '/bootstrap.php';
$_SERVER['argv'][] = '--test-directory=../../../tests';

// Pest 3 can return success for risky tests despite this flag; retain the CI gate.
if (in_array('--fail-on-risky', $_SERVER['argv'], true)) {
    register_shutdown_function(static function(): void {
        if (class_exists(\PHPUnit\TestRunner\TestResult\Facade::class, false)
            && \PHPUnit\TestRunner\TestResult\Facade::result()->hasTestConsideredRiskyEvents()) {
            fwrite(STDERR, "Risky tests prevent a successful test run.\n");
            exit(1);
        }
    });
}

require CRAFT_VENDOR_PATH . '/pestphp/pest/bin/pest';
