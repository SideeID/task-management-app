'use client';

import { useState } from 'react';
import { Task } from '@/types/task';
import { useMutateTask } from '../hooks/useMutateTask';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type TaskFormProps = {
  task?: Task;
  mode: 'create' | 'edit';
  trigger?: React.ReactNode;
  onSuccess?: () => void;
};

export const TaskForm = ({ task, mode, trigger, onSuccess }: TaskFormProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(task?.title || '');
  const [status, setStatus] = useState<'pending' | 'done'>(
    task?.status || 'pending'
  );

  const { create, update } = useMutateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'create') {
      await create.mutateAsync({
        title,
        status,
      });
    } else if (task) {
      await update.mutateAsync({
        id: task.id,
        data: {
          title,
          status,
        },
      });
    }

    setOpen(false);
    onSuccess?.();

    if (mode === 'create') {
      setTitle('');
      setStatus('pending');
    }
  };

  const isLoading = create.isPending || update.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>{mode === 'create' ? 'Add Task' : 'Edit'}</Button>}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Task' : 'Edit Task'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Fill in the details to create a new task.'
              : 'Update the task details below.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter task title'
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={status}
                onValueChange={(value: string) =>
                  setStatus(value as 'pending' | 'done')
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='done'>Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button type='submit' disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : mode === 'create'
                  ? 'Create'
                  : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
