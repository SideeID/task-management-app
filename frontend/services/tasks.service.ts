import { api } from '@/lib/axios';
import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  ApiResponse,
  PaginatedData,
} from '@/types/task';

export const TaskService = {
  getAll: (perPage: number = 5) =>
    api.get<ApiResponse<PaginatedData<Task>>>('/api/tasks', {
      params: { per_page: perPage },
    }),

  getById: (id: number) => api.get<ApiResponse<Task>>(`/api/tasks/${id}`),

  create: (data: CreateTaskPayload) =>
    api.post<ApiResponse<Task>>('/api/tasks', data),

  update: (id: number, data: UpdateTaskPayload) =>
    api.put<ApiResponse<Task>>(`/api/tasks/${id}`, data),

  delete: (id: number) => api.delete<ApiResponse<null>>(`/api/tasks/${id}`),
};
