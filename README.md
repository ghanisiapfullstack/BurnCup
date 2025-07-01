# Burncup Fullstack Monorepo (Next.js + Go + Docker)

Welcome to the **Burncup** project! This is a fullstack monorepo built with:

- **Frontend**: Next.js 14 with Turbopack (fast, modern React engine)
- **Backend**: Go with [Air](https://github.com/air-verse/air) for live reload
- **Docker**: For consistent development across machines

---

## Tech Stack

| Layer     | Tech                        | Purpose                        |
|-----------|-----------------------------|--------------------------------|
| Frontend  | Next.js + Turbopack         | Modern web UI framework        |
| Backend   | Go + Air                    | REST API with live reload      |
| Dev Env   | Docker + Docker Compose     | Local dev environment          |
| Watcher   | watchexec (for frontend)    | File watcher to force reload   |

---

## Local Development

### Prerequisites

- Docker Desktop (latest version)
- Optional but recommended on Windows:
  - WSL2 enabled
  - Run projects inside the Linux filesystem (e.g., `~/projects/` in WSL)

---

### Quickstart (Spin Up Dev Environment)

From the root of the project, run:

```bash
docker compose -f docker-compose.dev.yml up --build
