# Task Management API

REST API sederhana untuk manajemen task menggunakan Laravel dengan implementasi Repository Pattern dan Service Layer.
[Dokumentasi API](https://uelenuhbvd.apidog.io/get-task-by-id-24853333e0)

## Fitur

-   ✅ Create Task
-   ✅ List All Tasks
-   ✅ Update Task
-   ✅ Delete Task
-   ✅ CORS Enabled
-   ✅ Validation Request
-   ✅ Resource Response

## Tech Stack

-   Laravel 11
-   PHP 8.2+
-   MySQL
-   Repository Pattern
-   Service Layer Pattern

## Struktur Folder

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       └── TaskController.php      # Handle HTTP Request/Response
│   ├── Requests/
│   │   ├── StoreTaskRequest.php        # Validasi Create Task
│   │   └── UpdateTaskRequest.php       # Validasi Update Task
│   └── Resources/
│       └── TaskResource.php            # Format Response JSON
├── Models/
│   └── Task.php                        # Eloquent Model
├── Repositories/
│   └── TaskRepository.php              # Database Query Layer
└── Services/
    └── TaskService.php                 # Business Logic Layer
```

## Alur Request Flow

```
HTTP Request
    ↓
Controller (TaskController)
    ↓
Form Request (StoreTaskRequest/UpdateTaskRequest) → Validasi
    ↓
Service (TaskService) → Business Logic
    ↓
Repository (TaskRepository) → Database Query
    ↓
Model (Task) → Eloquent ORM
    ↓
Database
    ↓
← Response (TaskResource) → Format JSON
```

## Setup Instructions

```bash
git clone https://github.com/SideeID/task-management-app.git
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
