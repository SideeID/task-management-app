'use client';

import { Task } from '@/types/task';
import { useMutateTask } from '../hooks/useMutateTask';
import { TaskForm } from './TaskForm';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatDate } from '@/utils/formatDate';

type TaskItemProps = {
  task: Task;
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  done: 'bg-green-100 text-green-800',
};

const statusLabels = {
  pending: 'Pending',
  done: 'Done',
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const { remove } = useMutateTask();

  const handleDelete = async () => {
    await remove.mutateAsync(task.id);
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <CardTitle className='text-xl'>{task.title}</CardTitle>
            <CardDescription className='mt-1'>
              Created {formatDate(task.created_at)}
            </CardDescription>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              statusColors[task.status]
            }`}
          >
            {statusLabels[task.status]}
          </span>
        </div>
      </CardHeader>
      <CardFooter className='flex gap-2'>
        <TaskForm
          task={task}
          mode='edit'
          trigger={
            <Button variant='outline' size='sm'>
              Edit
            </Button>
          }
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='destructive' size='sm' disabled={remove.isPending}>
              {remove.isPending ? 'Menghapus...' : 'Hapus'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Aksi ini tidak dapat dibatalkan. Apakah Anda yakin ingin
                menghapus tugas {task.title}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
