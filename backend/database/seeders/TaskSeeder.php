<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'title' => 'Task 1',
                'status' => Task::STATUS_DONE,
            ],
            [
                'title' => 'Task 2',
                'status' => Task::STATUS_DONE,
            ],
            [
                'title' => 'Task 3',
                'status' => Task::STATUS_PENDING,
            ],
            [
                'title' => 'Task 4',
                'status' => Task::STATUS_PENDING,
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}
