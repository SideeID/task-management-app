import 'package:get/get.dart';
import 'package:mobile/models/task_model.dart';
import 'package:mobile/services/task_service.dart';

class TaskController extends GetxController {
  final TaskService service = TaskService();

  var tasks = <TaskModel>[].obs;
  var isLoading = false.obs;
  var errorMessage = ''.obs;

  @override
  void onInit() {
    fetchTasks();
    super.onInit();
  }

  Future<void> fetchTasks() async {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      final fetchedTasks = await service.getTasks();
      tasks.value = fetchedTasks;
    } catch (e) {
      errorMessage.value = 'Error fetching tasks: $e';
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> addTask(String title, String status) async {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      final newTask = await service.createTask(title, status);
      tasks.add(newTask);
    } catch (e) {
      errorMessage.value = 'Error adding task: $e';
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> updateTask(int id, String title, String status) async {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      final updatedTask = await service.updateTask(id, title, status);
      final index = tasks.indexWhere((task) => task.id == id);
      if (index != -1) {
        tasks[index] = updatedTask;
      }
    } catch (e) {
      errorMessage.value = 'Error updating task: $e';
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> deleteTask(int id) async {
    isLoading.value = true;
    errorMessage.value = '';
    try {
      await service.deleteTask(id);
      tasks.removeWhere((task) => task.id == id);
    } catch (e) {
      errorMessage.value = 'Error deleting task: $e';
    } finally {
      isLoading.value = false;
    }
  }
}
