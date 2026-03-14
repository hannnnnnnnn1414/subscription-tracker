# Subscription Tracker API

Backend REST API untuk tracking subscription pengguna, dibangun dengan TypeScript, Node.js, Express, Prisma, dan PostgreSQL.

---

## Tech Stack

| Technology | Kegunaan |
|---|---|
| **TypeScript** | Type-safe JavaScript |
| **Node.js + Express** | Server & routing |
| **Prisma** | ORM untuk database |
| **PostgreSQL** | Database relational |
| **Arcjet** | Rate limiting & bot protection |
| **Upstash** | Workflow & email scheduling |
| **Nodemailer** | Kirim email reminder |

---

## Phase 1 — Project Setup

### Prerequisites

Pastikan sudah terinstall di komputer:
- [Node.js](https://nodejs.org) v18+
- [PostgreSQL](https://www.postgresql.org)
- npm

---

### Instalasi

**1. Clone repository & masuk ke folder:**
```bash
git clone <repo-url>
cd subscription-tracker
```

**2. Install dependencies:**
```bash
# Main dependencies
npm install express prisma @prisma/client bcryptjs jsonwebtoken nodemailer dotenv cookie-parser

# Dev dependencies
npm install -D typescript ts-node nodemon @types/express @types/node @types/bcryptjs @types/jsonwebtoken @types/nodemailer @types/cookie-parser
```

**3. Setup environment variables:**

Buat file `.env` di root project:
```env
# Server
PORT=5500
NODE_ENV=development

# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/subscription_tracker"

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=1d

# Email
EMAIL_ADDRESS=youremail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

> Ganti `USER` dan `PASSWORD` sesuai konfigurasi PostgreSQL kamu.

**4. Jalankan development server:**
```bash
npm run dev
```

Server akan berjalan di `http://localhost:5500`

---

### Struktur Folder

```
subscription-tracker/
├── src/
│   ├── config/
│   │   └── env.ts          # Export semua environment variables
│   ├── controllers/        # Logic tiap endpoint
│   ├── middlewares/        # Auth, error handling, rate limiting
│   ├── routes/             # Definisi semua API routes
│   ├── utils/              # Helper functions (email template, dll)
│   └── app.ts              # Entry point — setup Express server
├── prisma/
│   └── schema.prisma       # Definisi database models & relasi
├── .env                    # Environment variables (jangan di-push ke GitHub!)
├── .gitignore
├── tsconfig.json           # Konfigurasi TypeScript
└── package.json
```

---

### Scripts

| Command | Fungsi |
|---|---|
| `npm run dev` | Jalankan server development (auto-restart dengan nodemon) |
| `npm run build` | Compile TypeScript ke JavaScript |
| `npm start` | Jalankan hasil build (untuk production) |

---

### Konfigurasi TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Poin penting:**
- `rootDir: ./src` → semua source code TypeScript ada di sini
- `outDir: ./dist` → hasil compile masuk ke sini
- `strict: true` → TypeScript strict mode aktif, semua tipe harus jelas

---

### Environment Variables (`src/config/env.ts`)

Semua env variable dibaca dan divalidasi di satu tempat:

```typescript
import dotenv from 'dotenv';
dotenv.config();

// Validasi — app langsung error kalau ada env yang kosong
const requiredEnvVars = ['PORT', 'NODE_ENV', 'DATABASE_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'EMAIL_ADDRESS', 'EMAIL_PASSWORD'] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const PORT = process.env.PORT!;
export const NODE_ENV = process.env.NODE_ENV!;
// ... dst
```

> Pattern ini memastikan app tidak bisa jalan kalau ada env yang belum diisi — menghindari bug yang susah dilacak.

---

### Test Endpoint

Setelah server jalan, akses:
```
GET http://localhost:5500/
```

Response:
```json
{
  "message": "Welcome to Subscription Tracker API"
}
```

---

## Roadmap

- [x] **Phase 1** — Project Setup & Express Server
- [ ] **Phase 2** — Database Schema (Prisma + PostgreSQL)
- [ ] **Phase 3** — Authentication (JWT)
- [ ] **Phase 4** — User Routes
- [ ] **Phase 5** — Subscription CRUD
- [ ] **Phase 6** — Rate Limiting & Security (Arcjet)
- [ ] **Phase 7** — Email Reminder Workflow (Upstash)

---

## Catatan Penting

- File `.env` **jangan pernah** di-push ke GitHub. Pastikan sudah ada di `.gitignore`.
- Untuk production, ganti `JWT_SECRET` dengan string yang benar-benar random dan panjang.
- `EMAIL_PASSWORD` adalah **App Password** dari Gmail, bukan password akun Gmail biasa. Aktifkan dulu 2-Step Verification di akun Google, lalu buat App Password di pengaturan keamanan.
