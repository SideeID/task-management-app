# Task Manajemen Client

Frontend aplikasi Task Manajemen yang dibangun menggunakan Next.js TypeScript dan Tanstack Query.

## Fitur 
-   ✅ Create Task
-   ✅ List All Tasks
-   ✅ Update Task
-   ✅ Delete Task

## Tech Stack
-   Next.js 16
-   TypeScript
-   Tanstack Query
-   Shadcn UI
-   Axios

## Struktur Folder

```
app/
├── (dashboard)/
│   ├── layout.tsx                        # Layout Dashboard
│   └── tasks/
│       ├── components/
│       │   ├── TaskForm.tsx              # Form Create/Update Task
│       │   ├── TaskItem.tsx              # Item Task
│       │   └── TaskList.tsx              # List Semua Task
│       ├── hooks/
│       │   ├── useMutateTask.ts          # Custom Hook untuk Mutasi Task
│       │   └── useTasks.ts               # Custom Hook untuk Fetch Task
│       ├── index.ts                      # Ekspor Komponen Task
│       └── page.tsx                      # Halaman Task Management
├── components/
│   ├── ui/                               # Komponen UI Shadcn
│   ├── Loading.tsx                       # Komponen Loading
│   └── ErrorState.tsx                    # Komponen Error State
├── lib/
│   ├── axios.ts                          # Konfigurasi Axios Instance
│   ├── env.ts                            # Konfigurasi Environment Variables
│   ├── queryClient.ts                    # Konfigurasi Tanstack Query Client
│   └── utils.ts                          # Fungsi Utilitas
├── services/
│   └── tasks.service.ts                  # Service untuk API Task
├── types/
│   └── task.ts                           # Tipe Data Task
└── utils/
    └── formatDate.ts                     # Fungsi Format Tanggal
```

## Setup Project

```bash
bun i
cp .env.example .env.local
bun run dev
```