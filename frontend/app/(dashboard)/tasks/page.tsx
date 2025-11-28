'use client';

import { useTasks } from './hooks/useTasks';
import {
  TaskList,
  TaskForm,
} from './index';
import { Loading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/ui/button';

export default function TasksPage() {
  const { data: tasks, isLoading, isError, error, refetch } = useTasks();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || 'Failed to load tasks'}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Task Management</h1>
          <p className='text-muted-foreground mt-2'>
            Mengatur dan melacak semua tugas.
          </p>
        </div>
        <TaskForm
          mode='create'
          trigger={<Button size='lg'>+ Add Task</Button>}
        />
      </div>

      <TaskList tasks={tasks || []} />
    </div>
  );
}
