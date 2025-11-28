# Task Management Mobile

Deskripsi

- Ini adalah project Flutter pertama saya. Pola arsitektur yang saya gunakan adalah hasil "ngide" sendiri: saya menambahkan lapisan `controller` dan `service` yang saya adopsi dari pola yang biasa saya pakai saat mengembangkan website. Project ini juga dibantu oleh AI selama proses pengembangan untuk menuntun sintaks Dart. (btw, saya baru belajar Flutter jadi mohon maklum kalau ada yang kurang pas).

## Struktur Folder

```
lib/
│   main.dart                    // Entry point aplikasi dan konfigurasi GetMaterialApp
│
├── config/
│   └── api.dart                 // Inisialisasi klien HTTP (Dio) dan base URL API
│
├── controllers/
│   └── task_controller.dart     // GetX controller: state tasks, loading, error, CRUD
│
├── models/
│   └── task_model.dart          // Model data Task (id, title, status)
│
├── services/
│   └── task_service.dart        // Akses API: get/create/update/delete dengan Dio
│
└── ui/
	└── screens/
		└── task_list_screen.dart // UI daftar task (ListView.builder) + add/edit/delete
```

Penjelasan Singkat

- `main.dart`: Menggunakan `GetMaterialApp` dan menampilkan `TaskListScreen` sebagai halaman utama.
- `config/api.dart`: Menyimpan konfigurasi `Dio` termasuk `baseUrl`, header, dan timeout.
- `controllers/task_controller.dart`: Mengelola state menggunakan GetX (`tasks`, `isLoading`, `errorMessage`) dan memanggil `TaskService` untuk operasi CRUD.
- `models/task_model.dart`: Representasi entitas Task dan konversi dari JSON.
- `services/task_service.dart`: Implementasi pemanggilan API sesuai spesifikasi (respons dibungkus dalam field `data`).
- `ui/screens/task_list_screen.dart`: Menampilkan daftar task dengan `ListView.builder`, pull-to-refresh, dialog tambah/edit, dan swipe-to-delete.

## Instalasi & Menjalankan

```pwsh
flutter pub get
flutter run
```

## Teknologi & Bantuan

- Framework: Flutter
- State management: GetX
- HTTP client: Dio
- Bantuan AI: Pengembangan dibantu AI untuk mempercepat adaptasi sintaks Dart dan perancangan struktur.
