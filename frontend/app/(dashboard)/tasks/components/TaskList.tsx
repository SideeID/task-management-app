'use client';

import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className='py-12 text-center'>
        <p className='text-muted-foreground'>
          No tasks found. Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
