import { useQuery } from '@tanstack/react-query';
import { TaskService } from '@/services/tasks.service';

export const useTasks = (perPage: number = 6) => {
  return useQuery({
    queryKey: ['tasks', perPage],
    queryFn: async () => {
      const response = await TaskService.getAll(perPage);
      return response.data.data.data;
    },
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: async () => {
      const response = await TaskService.getById(id);
      return response.data.data;
    },
    enabled: !!id,
  });
};
