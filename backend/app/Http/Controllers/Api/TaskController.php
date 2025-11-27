<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $service
    ) {}

    public function index(Request $request): TaskResource
    {
        try {
            $perPage = $request->input('per_page', 10);
            $tasks = $this->service->getAllTasks($perPage);

            return new TaskResource(true, 'List of tasks retrieved successfully', $tasks, 200);
        } catch (\Exception $e) {
            return new TaskResource(false, 'Failed to retrieve tasks: ' . $e->getMessage(), null, 500);
        }
    }

    public function show(int $id): TaskResource
    {
        try {
            $task = $this->service->getTaskById($id);

            if (!$task) {
                return new TaskResource(false, 'Task not found', null, 404);
            }

            return new TaskResource(true, 'Task retrieved successfully', $task, 200);
        } catch (\Exception $e) {
            return new TaskResource(false, 'Failed to retrieve task: ' . $e->getMessage(), null, 500);
        }
    }

    public function store(StoreTaskRequest $request): TaskResource
    {
        try {
            $task = $this->service->createTask($request->validated());

            return new TaskResource(true, 'Task created successfully', $task, 201);
        } catch (\Exception $e) {
            return new TaskResource(false, 'Failed to create task: ' . $e->getMessage(), null, 500);
        }
    }

    public function update(int $id, StoreTaskRequest $request): TaskResource
    {
        try {
            $task = $this->service->updateTask($id, $request->validated());

            return new TaskResource(true, 'Task updated successfully', $task, 200);
        } catch (\Exception $e) {
            $statusCode = str_contains($e->getMessage(), 'not found') ? 404 : 500;
            return new TaskResource(false, 'Failed to update task: ' . $e->getMessage(), null, $statusCode);
        }
    }

    public function destroy(int $id): TaskResource
    {
        try {
            $this->service->deleteTask($id);

            return new TaskResource(true, 'Task deleted successfully', null, 200);
        } catch (\Exception $e) {
            $statusCode = str_contains($e->getMessage(), 'not found') ? 404 : 500;
            return new TaskResource(false, 'Failed to delete task: ' . $e->getMessage(), null, $statusCode);
        }
    }
}
