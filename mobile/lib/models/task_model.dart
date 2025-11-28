class TaskModel {
  final int id;
  final String title;
  final String status;

  TaskModel({
    required this.id,
    required this.title,
    required this.status,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['id'],
      title: json['title'],
      status: json['status'],
    );
  }
}