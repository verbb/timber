<?php
namespace verbb\timber\console;

use Exception;
use Graze\ParallelProcess\Event\EventDispatcherTrait;
use Graze\ParallelProcess\Event\PriorityChangedEvent;
use Graze\ParallelProcess\Event\RunEvent;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;
use Throwable;

use Graze\ParallelProcess\RunInterface;
use Graze\ParallelProcess\RunningStateTrait;
use Graze\ParallelProcess\PrioritisedTrait;

class ProcessRun implements RunInterface
{
    use EventDispatcherTrait;
    use RunningStateTrait;
    use PrioritisedTrait;

    /** @var Process */
    private Process $process;
    /** @var bool */
    private bool $successful = false;
    /** @var bool */
    private bool $completed = false;
    /** @var string */
    private string $last = '';
    /** @var string[] */
    private array $tags;

    /**
     * Run constructor.
     *
     * @param Process  $process
     * @param string[] $tags List of key value tags associated with this run
     * @param float $priority
     */
    public function __construct(Process $process, array $tags = [], float $priority = 1.0)
    {
        $this->process = $process;
        $this->tags = $tags;
        $this->priority = $priority;
    }

    /**
     * @return string[]
     */
    protected function getEventNames(): array
    {
        return [
            RunEvent::STARTED,
            RunEvent::COMPLETED,
            RunEvent::FAILED,
            RunEvent::UPDATED,
            RunEvent::SUCCESSFUL,
            PriorityChangedEvent::CHANGED,
        ];
    }

    /**
     * Start the process
     *
     * @return $this
     */
    public function start(): static
    {
        if (!$this->process->isStarted()) {
            $this->setStarted();
            $this->dispatch(RunEvent::STARTED, new RunEvent($this));

            $this->process->start(
                function ($type, $data) {
                    $this->last = $data;

                    $this->dispatch(RunEvent::UPDATED, new RunEvent($this));
                }
            );

            $this->completed = false;
        }

        return $this;
    }

    /**
     * Poll the process to see if it is still running, and trigger events
     *
     * @return bool true if the process is currently running (started and not terminated)
     */
    public function poll(): bool
    {
        if ($this->completed || !$this->hasStarted()) {
            return false;
        }

        if ($this->process->isRunning()) {
            return true;
        }

        $this->completed = true;
        $this->setFinished();

        if ($this->process->isSuccessful()) {
            $this->successful = true;
            $this->dispatch(RunEvent::SUCCESSFUL, new RunEvent($this));
        } else {
            $this->dispatch(RunEvent::FAILED, new RunEvent($this));
        }

        $this->dispatch(RunEvent::COMPLETED, new RunEvent($this));

        return false;
    }

    /**
     * Return if the underlying process is running
     *
     * @return bool
     */
    public function isRunning(): bool
    {
        return $this->process->isRunning();
    }

    /**
     * @return bool
     */
    public function isSuccessful(): bool
    {
        return $this->successful;
    }

    /**
     * @return bool
     */
    public function hasStarted(): bool
    {
        return $this->process->isStarted();
    }

    /**
     * @return Process
     */
    public function getProcess(): Process
    {
        return $this->process;
    }

    /**
     * @return array
     */
    public function getTags(): array
    {
        return $this->tags;
    }

    /**
     * @return string
     */
    public function getLastMessage(): string
    {
        return $this->last;
    }

    /**
     * @return float[]|null the process between 0 and 1 if the run supports it, otherwise null
     */
    public function getProgress(): ?array
    {
        return null;
    }

    /**
     * If the run was unsuccessful, get the error if applicable
     *
     * @return Exception[]|Throwable[]
     */
    public function getExceptions(): array
    {
        if ($this->hasStarted() && !$this->isSuccessful()) {
            return [new ProcessFailedException($this->process)];
        }
        return [];
    }
}