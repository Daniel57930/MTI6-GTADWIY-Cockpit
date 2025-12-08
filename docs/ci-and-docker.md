# CI and Docker Guide

This document explains how to build, run, and deploy the MTI6-GTADWIY-Cockpit application using Docker and CI/CD.

## Table of Contents
- [Local Development](#local-development)
- [Building the Application](#building-the-application)
- [Docker](#docker)
- [CI/CD Pipeline](#cicd-pipeline)
- [Environment Variables and Secrets](#environment-variables-and-secrets)

## Local Development

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn
- Docker (optional, for containerized development)

### Install Dependencies

For the frontend:
```bash
npm ci
```

For the server:
```bash
cd server
npm ci
cd ..
```

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Run Server (separate terminal)

```bash
cd server
npm start
```

## Building the Application

### Build Frontend for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Docker

### Build Docker Image

Build the Docker image for the frontend:

```bash
docker build -t mti6-cockpit:latest .
```

This uses a multi-stage build:
1. **Build stage**: Uses `node:18-alpine` to install dependencies and build the Vite app
2. **Production stage**: Uses `nginx:stable-alpine` to serve the static files

### Run Docker Container

Run the containerized application:

```bash
docker run -p 8080:80 mti6-cockpit:latest
```

The application will be available at `http://localhost:8080`.

### Docker Configuration

The Docker setup includes:
- **Dockerfile**: Multi-stage build configuration
- **nginx.conf**: Nginx configuration with:
  - Client-side routing support (SPA fallback to `/index.html`)
  - Gzip compression
  - Static asset caching
  - Security headers
- **.dockerignore**: Excludes unnecessary files from the build context

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs automatically on:
- Push to `main` branch
- Pull requests targeting `main`

### Workflow Jobs

The CI pipeline runs two jobs in parallel:

#### 1. Frontend Job
- Checks out code
- Sets up Node.js 18.x
- Caches npm dependencies
- Runs `npm ci` to install dependencies
- Runs linter (if lint script exists)
- Runs tests (if test script exists)
- Builds the frontend with `npm run build`
- Uploads the `dist/` folder as an artifact

#### 2. Server Job
- Checks out code
- Sets up Node.js 18.x
- Caches npm dependencies (scoped to `server/`)
- Runs `npm ci` in the `server/` directory
- Runs server linter (if lint script exists)
- Runs server tests (if test script exists)
- Builds server (if build script exists)

### Viewing CI Results

1. Go to the **Actions** tab in the GitHub repository
2. Click on the workflow run to see job details
3. Download build artifacts from the workflow run page

## Environment Variables and Secrets

### Local Development

**Never commit `.env` files with actual secrets to the repository.**

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual API keys in `.env.local`:
   ```bash
   OPENROUTER_API_KEY=your-actual-key-here
   MISTRAL_API_KEY=your-actual-key-here
   # ... etc
   ```

3. `.env.local` is ignored by Git (see `.gitignore`) and will not be committed.

### GitHub Actions Secrets

For CI/CD, use GitHub Secrets to store sensitive values:

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secrets with names matching the environment variables (e.g., `OPENROUTER_API_KEY`)

To use secrets in the workflow, reference them in the workflow file:
```yaml
env:
  OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}
```

### Production Deployment

When deploying to production:
- Use environment-specific configuration (e.g., Kubernetes secrets, AWS Secrets Manager, etc.)
- Never hardcode secrets in the Dockerfile or source code
- Rotate any secrets that may have been accidentally committed to version control

### Security Best Practices

- ✅ Use `.env.local` for local development
- ✅ Use GitHub Secrets for CI/CD pipelines
- ✅ Use `.env.example` with placeholder values (no real secrets)
- ❌ Never commit `.env` files with real secrets
- ❌ Never hardcode API keys in source code
- 🔄 Rotate any leaked credentials immediately

If secrets were previously committed, they remain in Git history. Consider:
- Using `git-filter-repo` or BFG Repo-Cleaner to remove them from history
- Rotating all affected credentials immediately
- See [GitHub's guide on removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Nginx Documentation](https://nginx.org/en/docs/)
