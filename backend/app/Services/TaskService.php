<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\TaskRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TaskService
{
    public function __construct(
        private TaskRepository $repository
    ) {}

    public function getAllTasks(int $perPage = 10): LengthAwarePaginator
    {
        return $this->repository->getAll($perPage);
    }

    public function getTaskById(int $id): ?Task
    {
        return $this->repository->findById($id);
    }

    public function createTask(array $data): Task
    {
        return $this->repository->create($data);
    }

    public function updateTask(int $id, array $data): Task
    {
        $task = $this->repository->findById($id);

        if (!$task) {
            throw new \Exception('Task not found', 404);
        }

        $this->repository->update($task, $data);
        return $task->fresh();
    }

    public function deleteTask(int $id): bool
    {
        $task = $this->repository->findById($id);

        if (!$task) {
            throw new \Exception('Task not found', 404);
        }

        return $this->repository->delete($task);
    }
}
