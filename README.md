# ProdStack — Full Stack CI/CD Boilerplate (Mini CRUD)

## What is included
- Backend (Node.js + Express + MongoDB) — `/backend`
- Frontend (React + Vite) — `/frontend`
- Dockerfiles for both services
- `docker-compose.yml` for running on server
- Nginx config for reverse proxy
- GitHub Actions workflow to build/push images and deploy to EC2

## Quick start (local)
1. Install Docker & Docker Compose.
2. Start MongoDB (local or use Atlas) and set `MONGO_URI` in `backend/.env`.
3. Build & run (local images):
   ```bash
   docker-compose build
   docker-compose up
   ```
4. Visit `http://localhost` to see frontend, backend is at `http://localhost:4000`.

## Deploy to AWS EC2 (summary)
1. Provision Ubuntu EC2 and install Docker & docker-compose.
2. Clone repo on EC2 into `/home/ubuntu/prodstack`.
3. Add `backend/.env` with your `MONGO_URI`.
4. On GitHub, add Secrets:
   - DOCKER_USERNAME
   - DOCKER_PASSWORD
   - EC2_HOST (public IP)
   - EC2_SSH_KEY (private key content)
5. Push to `main` — GitHub Actions will build images, push to Docker Hub, SSH to EC2 and run `docker-compose up -d`.

## Notes
- The workflow expects `docker-compose.yml` at repo root on EC2.
- Update `backend/.env` on EC2 with your MongoDB connection string.
- For production, secure Nginx, use HTTPS (letsencrypt), and protect your DB.
