# KLYRO — Online Competitive Software Engineering Arena

> **A 6-week engineering challenge platform developed by a 3-member team.**  
> *"Don't just show us what you built. Show us how you built it."*

---

## 🏛️ Monorepo Architecture & Team Ownership

```
Klyro/
├── frontend/             # Member 1 (React, Vite, Tailwind CSS)
├── backend/              # Member 2 (Node.js, Express, Supabase)
├── database/             # Member 2 (PostgreSQL Schemas & Seed SQL)
├── ai-service/           # Member 3 (Python, FastAPI, GitHub API, LLM)
├── docs/                 # Shared Engineering Docs
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
└── README.md
```

| Component | Owner | Responsibility |
| :--- | :--- | :--- |
| **`/frontend`** | **Member 1** | UI/UX, Matchmaking Lobby, Battle Cockpit, Leaderboard, Evaluation Results Viewer |
| **`/backend`** | **Member 2** | Express API, Supabase Auth, Matchmaking, Scoring Service, XP/Rating |
| **`/database`** | **Member 2** | Supabase PostgreSQL schema, migrations, and seeds |
| **`/ai-service`** | **Member 3** | FastAPI, GitHub evidence parser, AST analysis, LLM judging |

---

## 💻 How Teammates Can Run the Frontend Locally

If you want to view and run the frontend on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TanishkaDewan/Klyro.git
   cd Klyro
   ```

2. **Switch to the frontend branch:**
   ```bash
   git checkout feature/frontend
   ```

3. **Navigate to the frontend folder and install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Open **[http://localhost:5173/](http://localhost:5173/)** to explore the complete KLYRO platform!
