import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskService } from '@/services/tasks.service';
import { CreateTaskPayload, UpdateTaskPayload } from '@/types/task';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const useMutateTask = () => {
  const qc = useQueryClient();

  const create = useMutation({
    mutationFn: (data: CreateTaskPayload) => TaskService.create(data),
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(response.data.message || 'Tugas berhasil dibuat');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Gagal membuat tugas');
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTaskPayload }) =>
      TaskService.update(id, data),
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(response.data.message || 'Tugas berhasil diperbarui');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Gagal memperbarui tugas');
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => TaskService.delete(id),
    onSuccess: (response) => {
      qc.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(response.data.message || 'Tugas berhasil dihapus');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || 'Gagal menghapus tugas');
    },
  });

  return {
    create,
    update,
    remove,
  };
};
