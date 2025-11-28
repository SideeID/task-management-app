import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile/controllers/task_controller.dart';

class TaskListScreen extends StatelessWidget {
  TaskListScreen({super.key});

  final TaskController controller = Get.put(TaskController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tasks'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: controller.fetchTasks,
            tooltip: 'Refresh',
          ),
        ],
      ),
      body: Obx(() {
        if (controller.isLoading.value) {
          return const Center(child: CircularProgressIndicator());
        }

        if (controller.errorMessage.isNotEmpty) {
          return Center(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    controller.errorMessage.value,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: Colors.red),
                  ),
                  const SizedBox(height: 12),
                  FilledButton(
                    onPressed: controller.fetchTasks,
                    child: const Text('Retry'),
                  ),
                ],
              ),
            ),
          );
        }

        if (controller.tasks.isEmpty) {
          return const Center(child: Text('No tasks yet'));
        }

        return RefreshIndicator(
          onRefresh: controller.fetchTasks,
          child: ListView.builder(
            physics: const AlwaysScrollableScrollPhysics(),
            itemCount: controller.tasks.length,
            itemBuilder: (context, index) {
              final task = controller.tasks[index];
              return Dismissible(
                key: ValueKey(task.id),
                direction: DismissDirection.endToStart,
                background: Container(
                  color: Colors.red,
                  alignment: Alignment.centerRight,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: const Icon(Icons.delete, color: Colors.white),
                ),
                confirmDismiss: (direction) async {
                  return await showDialog<bool>(
                        context: context,
                        builder: (ctx) => AlertDialog(
                          title: const Text('Delete task?'),
                          content: Text(
                            'Are you sure to delete "${task.title}"?',
                          ),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.of(ctx).pop(false),
                              child: const Text('Cancel'),
                            ),
                            FilledButton(
                              onPressed: () => Navigator.of(ctx).pop(true),
                              child: const Text('Delete'),
                            ),
                          ],
                        ),
                      ) ??
                      false;
                },
                onDismissed: (_) => controller.deleteTask(task.id),
                child: ListTile(
                  title: Text(task.title),
                  subtitle: Text('ID: ${task.id}'),
                  trailing: _StatusChip(status: task.status),
                  onTap: () => _showAddOrEditDialog(
                    context,
                    isEdit: true,
                    id: task.id,
                    title: task.title,
                    status: task.status,
                  ),
                ),
              );
            },
          ),
        );
      }),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddOrEditDialog(context),
        child: const Icon(Icons.add),
      ),
    );
  }

  Future<void> _showAddOrEditDialog(
    BuildContext context, {
    bool isEdit = false,
    int? id,
    String? title,
    String? status,
  }) async {
    final titleCtrl = TextEditingController(text: title ?? '');
    String statusValue = status ?? 'pending';

    await showDialog<void>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(isEdit ? 'Edit Task' : 'Add Task'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleCtrl,
              decoration: const InputDecoration(
                labelText: 'Title',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Text('Status:'),
                const SizedBox(width: 12),
                DropdownButton<String>(
                  value: statusValue,
                  items: const [
                    DropdownMenuItem(value: 'pending', child: Text('pending')),
                    DropdownMenuItem(value: 'done', child: Text('done')),
                  ],
                  onChanged: (v) {
                    if (v != null) {
                      statusValue = v;
                    }
                  },
                ),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cancel'),
          ),
          FilledButton(
            onPressed: () async {
              final t = titleCtrl.text.trim();
              if (t.isEmpty) return;
              if (isEdit && id != null) {
                await controller.updateTask(id, t, statusValue);
              } else {
                await controller.addTask(t, statusValue);
              }
              if (context.mounted) Navigator.of(ctx).pop();
            },
            child: Text(isEdit ? 'Save' : 'Add'),
          ),
        ],
      ),
    );
  }
}

class _StatusChip extends StatelessWidget {
  const _StatusChip({required this.status});
  final String status;

  @override
  Widget build(BuildContext context) {
    MaterialColor color;
    switch (status) {
      case 'done':
        color = Colors.green;
        break;
      case 'in_progress':
        color = Colors.orange;
        break;
      default:
        color = Colors.grey;
    }
    return Chip(
      label: Text(status),
      backgroundColor: color.withOpacity(0.15),
      side: BorderSide(color: color.withOpacity(0.4)),
      labelStyle: TextStyle(color: color.shade700),
    );
  }
}
