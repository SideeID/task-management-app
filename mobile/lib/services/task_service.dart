import 'package:mobile/config/api.dart';
import 'package:mobile/models/task_model.dart';

class TaskService {
  Future<List<TaskModel>> getTasks() async {
    try {
      final response = await APIClient.dio.get('/tasks');
      if (response.statusCode != 200) {
        throw Exception('Failed to load tasks: HTTP ${response.statusCode}');
      }

      final body = response.data;
      List<dynamic> items;
      if (body is List) {
        items = body;
      } else if (body is Map<String, dynamic>) {
        final dataField = body['data'];
        if (dataField is List) {
          items = dataField;
        } else if (dataField is Map<String, dynamic>) {
          final inner = dataField['data'];
          if (inner is List) {
            items = inner;
          } else {
            items = const [];
          }
        } else {
          items = const [];
        }
      } else {
        items = const [];
      }

      return items
          .map((item) => TaskModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw Exception('Failed to load tasks: $e');
    }
  }

  Future<TaskModel> createTask(String title, String status) async {
    try {
      final response = await APIClient.dio.post(
        '/tasks',
        data: {'title': title, 'status': status},
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to create task: HTTP ${response.statusCode}');
      }

      final body = response.data;
      final data =
          body is Map<String, dynamic> && body['data'] is Map<String, dynamic>
          ? body['data'] as Map<String, dynamic>
          : body as Map<String, dynamic>;
      return TaskModel.fromJson(data);
    } catch (e) {
      throw Exception('Failed to create task: $e');
    }
  }

  Future<TaskModel> updateTask(int id, String title, String status) async {
    try {
      final response = await APIClient.dio.put(
        '/tasks/$id',
        data: {'title': title, 'status': status},
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to update task: HTTP ${response.statusCode}');
      }

      final body = response.data;
      final data =
          body is Map<String, dynamic> && body['data'] is Map<String, dynamic>
          ? body['data'] as Map<String, dynamic>
          : body as Map<String, dynamic>;
      return TaskModel.fromJson(data);
    } catch (e) {
      throw Exception('Failed to update task: $e');
    }
  }

  Future<void> deleteTask(int id) async {
    try {
      final response = await APIClient.dio.delete('/tasks/$id');
      if (response.statusCode != 200) {
        throw Exception('Failed to delete task: HTTP ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to delete task: $e');
    }
  }
}
