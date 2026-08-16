# KLYRO — Deployment Guide (`/docs/DEPLOYMENT.md`)

> **Shared Master Deployment Documentation**  
> **Target Environments**: Vercel (Frontend), Render (Backend & AI Service), Supabase (Database & Auth)

---

## 1. Service Deployment Mapping

```
Service          Owner       Platform    Entrypoint            Health Check
─────────────────────────────────────────────────────────────────────────────
/frontend        Member 1    Vercel      npm run build         /
/backend         Member 2    Render      node server.js        GET /health
/ai-service      Member 3    Render      uvicorn main:app      GET /health
/database        Member 2    Supabase    PostgreSQL 15+        Direct SQL
```

---

## 2. Frontend Deployment (Vercel)

1. Connect the GitHub repository `TanishkaDewan/Klyro` on [vercel.com](https://vercel.com).
2. Configure project settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Environment Variables:
   - `VITE_API_BASE_URL` = `https://klyro-backend.onrender.com`
4. Click **Deploy**.

---

## 3. Backend Deployment (Render)

1. Create a **Web Service** on Render pointing to repo root with root directory `backend`.
2. Environment: `Node`.
3. Build Command: `npm install`.
4. Start Command: `node server.js` (or `npm start`).
5. Ensure `PORT` is dynamically read from `process.env.PORT`.
6. Add Environment Variables:
   - `PORT`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AI_SERVICE_URL`
   - `FRONTEND_URL`

---

## 4. AI Service Deployment (Render)

1. Create a **Web Service** on Render with root directory `ai-service`.
2. Environment: `Python 3`.
3. Build Command: `pip install -r requirements.txt`.
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.
5. Add Environment Variables:
   - `PORT`
   - `GITHUB_TOKEN`
   - `GEMINI_API_KEY` (or `CLAUDE_API_KEY`)
