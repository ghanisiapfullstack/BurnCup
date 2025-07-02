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

## Dev Containers (VS Code)

You can use **Dev Containers** in Visual Studio Code to develop Burncup without needing to install Go, Node.js, or any dev tools locally. Everything runs inside a preconfigured Docker container with live reload out of the box.

---

### What’s Included

- ✅ Pre-installed dependencies (Node.js / Go)
- ✅ File change sync (hot reload)
- ✅ Consistent environment across all OS
- ✅ Choice between frontend and backend container

---

### Prerequisites

1. **[Visual Studio Code](https://code.visualstudio.com/)**
2. **[Docker Desktop](https://www.docker.com/products/docker-desktop)**
3. **Dev Containers Extension** in VS Code:
   - Open VS Code
   - Press:
     - `Ctrl + Shift + X` (Windows/Linux)
     - `Cmd + Shift + X` (macOS)
   - Search for: `Dev Containers`
   - Click **Install**

---

### Get Started

#### 1. Clone the Repository

```bash
git clone https://github.com/your-org/burncup.git
cd burncup
```

#### 2. Open a Dev Container

1. Open the `burncup` folder in VS Code
2. Press:
   - `Ctrl + Shift + P` (Windows/Linux)
   - `Cmd + Shift + P` (macOS)
3. Type: `Dev Containers: Open Folder in Container...`
4. Select a subfolder:
   - `burncup-fe/` → to develop the **frontend** (Next.js)
   - `burncup-be/` → to develop the **backend** (Go)

VS Code will now:
- Build the Docker container
- Mount the source code
- Open a terminal inside the container

---

### Start the Dev Server

Once inside the container, use the integrated terminal:

#### For Frontend (`burncup-fe/`)

```bash
# Don't run these, docker automatically runs it for you
npm install      # one-time setup
npm run dev      # starts Next.js with Turbopack (port 3000)
```

Visit: [http://127.0.0.1:3000](http://127.0.0.1:3000)

#### For Backend (`burncup-be/`)

```bash
# Don't run these, docker automatically runs it for you
go mod tidy      # one-time setup
air              # starts the Go server with live reload (port 8080)
```

Visit: [http://localhost:8080](http://localhost:8080)

