# KLYRO — System Architecture (`/docs/ARCHITECTURE.md`)

> **Shared Master Architecture Documentation**  
> **Owners**: Shared (Member 1, Member 2, Member 3)

---

## 1. High-Level Architecture

KLYRO is designed as three independently deployable application services:

```
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (React + Vite + Tailwind)         │
│               Owner: Member 1 · Deployed on Vercel      │
└────────────────────────────┬────────────────────────────┘
                             │ HTTPS (VITE_API_BASE_URL)
                             ▼
┌─────────────────────────────────────────────────────────┐
│             MAIN BACKEND (Node.js + Express)            │
│          Owner: Member 2 · Deployed on Render           │
└──────────────┬───────────────────────────┬──────────────┘
               │                           │ Internal Service Call
               ▼                           ▼
┌──────────────────────────────┐ ┌────────────────────────┐
│      SUPABASE DATABASE       │ │   AI EVALUATION ENGINE │
│    PostgreSQL + Supabase Auth│ │    (Python + FastAPI)  │
│       Owner: Member 2        │ │  Owner: Member 3       │
│      (Single DB Source)      │ │   Deployed on Render   │
└──────────────────────────────┘ └───────────┬────────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
            ┌──────────────────────┐                   ┌───────────────────────┐
            │   GitHub REST API    │                   │   Gemini / Claude     │
            │ (Repository Evidence)│                   │   (LLM Evaluation)    │
            └──────────────────────┘                   └───────────────────────┘
```

---

## 2. Team Ownership Matrix

| Folder / Document | Primary Owner | Tech Stack | Responsibility |
| :--- | :--- | :--- | :--- |
| **`/frontend`** | **Member 1** | React, Vite, Tailwind CSS | UI/UX, client routing, matchmaking lobby, cockpit HUD, leaderboard. |
| **`/backend`** | **Member 2** | Node.js, Express.js | Auth middleware, matchmaking logic, scoring service, XP/Rating calculation. |
| **`/database`** | **Member 2** | Supabase PostgreSQL | Relational schemas, migrations, seed data, RLS security policies. |
| **`/ai-service`** | **Member 3** | Python, FastAPI | GitHub REST client, repository preprocessing, prompt injection defense, LLM evaluation. |
| **`/docs/API_CONTRACT.md`** | **Member 2** | Markdown | REST API documentation and payload schemas. |
| **`/docs/DATABASE_SCHEMA.md`** | **Member 2** | Markdown | SQL tables, column types, and foreign key relations. |
| **`/docs/AI_EVALUATION.md`** | **Member 3** | Markdown | 6-dimension evaluation prompts and validation schemas. |
| **`/docs/GITHUB_ANALYSIS.md`** | **Member 3** | Markdown | Ingestion pipeline, diff parsing, and contribution estimation metrics. |
| **`/docs/DEPLOYMENT.md`** | **Shared** | Markdown | Production deployment instructions for Vercel and Render. |
| **`/docs/ARCHITECTURE.md`** | **Shared** | Markdown | System design, data flow, and architecture integrity. |

---

## 3. Communication Rules

1. **Frontend talks ONLY to Main Backend.**
2. **AI Service talks ONLY to Main Backend.** (Never talks directly to frontend, never writes directly to Supabase).
3. **Main Backend is the single source of truth** for all database writes and client auth.
