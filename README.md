# Developer Portfolio

Full-stack personal portfolio with a public site and an admin dashboard for
managing all content (projects, blog, skills, experience, certificates,
resume, and contact messages).

## Stack

| Layer     | Tech |
|-----------|------|
| Frontend  | React + Vite + TypeScript, Tailwind CSS, Framer Motion, React Router, Axios |
| Backend   | Node.js + Express, JWT auth, bcrypt, Multer, Nodemailer |
| Database  | PostgreSQL + Prisma ORM |
| DevOps    | Docker + Docker Compose, GitHub Actions, Nginx |

## Repository layout

```
per-portfolio/
├── backend/     Express API + Prisma
├── frontend/    Vite React app (public site + admin dashboard)
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Local development

### 1. Database

```bash
docker compose up -d db          # Postgres on :5432
# or use a local Postgres and set DATABASE_URL accordingly
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run seed                     # creates admin user + sample content
npm run dev                      # API on http://localhost:4000
```

Default admin (from seed): **admin@example.com / admin1234**

### 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev                      # app on http://localhost:5173
```

Public site: `/`  ·  Admin: `/admin/login`

## Production

```bash
docker compose up --build        # db + backend + nginx-served frontend
```

Frontend served on `:8080`, API on `:4000`.
