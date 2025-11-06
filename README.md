<h1 align="center">
 <img src="https://i.imgur.com/Xohapcq.png" title="voi logo" />
</h1>

<p align="center">Made by ⚡Sieutoc</p>

<p align="center" width="100%">
    <img src="https://github.com/getsieutoc/voi/assets/1083478/7afcc2d3-0a2b-4bc8-acb8-42f99ded4bdd" />
</p>

> [!IMPORTANT]
> Work in progress, breaking changes are expected!

## Features

- Next.js 16
- TypeScript
- ESLint
- Prettier
- Shadcn UI with Tailwind CSS
- Postgresql with Prisma
- Email OTP authentication with Better-Auth

## Demo

<https://voi.up.railway.app>

## Getting Started

### Deploy with Dokploy

For easy deployment with Docker, we recommend using [Dokploy](https://dokploy.com) - a self-hosted platform that simplifies application deployment. Follow the Docker deployment instructions below and use Dokploy's interface to manage your deployment.

### Normal Installation

You need at least one Postgresql instance up and running.

Then you can deploy like a simple Next.js app, there are lot of tutorial on Vercel, Netlify etc.

The environment variables you need:

```bash
BETTER_AUTH_SECRET=topsecret
BETTER_AUTH_URL=https://yourdomain.com
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
DATABASE_URL=postgres://....

SMTP_USER=yoursmtpuser
SMTP_PASSWORD=yoursmtppass
SMTP_HOST=yoursmtpserver
SMTP_PORT=587
```

### For Development

- We use `pnpm` package manager. Get it [here](https://pnpm.io/installation).
- Make sure Docker up and running.
- If your Docker account has 2FA enabled, you have to create a Personal Access Token and login before:
  - Follow [this guide](https://docs.docker.com/docker-hub/access-tokens/).
  - Login with `docker login --username <your-username>`

#### Install dependencies

```bash
cd your-project
pnpm install
```

#### Setup environment variables

For the first time, you need some default environment variables:

```bash

cp .env.example .env
```

Then, run the development server:

```bash
pnpm dev
```

#### Setup Prisma

NOTE: The dev server need to be running, because we need Postgres instance.

Sometimes, for example in fresh database situation when you have just started:

```bash
pnpm prisma migrate dev
```

### Create New UI Component

We use [shadcn-ui](https://ui.shadcn.com/), and create 2 helper scripts for you:

```bash
# for adding new component
pnpm ui:add <compnent-name>

# for checking diffs
pnpm ui:diff <component-name>
```

#### Start developing

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.

### Good to know

- This project uses `App Router` feature.
- We try to take adventage of Next.js's ecosystem, thus most of the features here are built on top of Next.js best practices.

## Releases

This project uses automated releases powered by [semantic-release](https://github.com/semantic-release/semantic-release) and follows [Conventional Commits](https://www.conventionalcommits.org/) specification.

### How Releases Work

Every push to the `master` branch triggers an automated release process that:

1. Analyzes commit messages to determine the version bump
2. Generates/updates the `CHANGELOG.md` file
3. Creates a GitHub release with release notes
4. Updates the version in `package.json`

### Commit Message Format

Follow the Conventional Commits format for your commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Types

- `feat`: A new feature (triggers **minor** version bump: 0.1.0 → 0.2.0)
- `fix`: A bug fix (triggers **patch** version bump: 0.1.0 → 0.1.1)
- `perf`: Performance improvements (triggers **patch** version bump)
- `refactor`: Code refactoring (triggers **patch** version bump)
- `docs`: Documentation changes (no release)
- `style`: Code style changes (no release)
- `test`: Adding or updating tests (no release)
- `chore`: Maintenance tasks (no release)
- `ci`: CI/CD changes (no release)
- `build`: Build system changes (no release)
- `revert`: Reverting previous changes (triggers **patch** version bump)

#### Breaking Changes

For breaking changes, add `!` after the type or include `BREAKING CHANGE:` in the footer to trigger a **major** version bump:

```bash
# Example 1: Using !
git commit -m "feat!: redesign authentication API"

# Example 2: Using footer
git commit -m "feat: redesign authentication API

BREAKING CHANGE: The authentication API endpoints have been completely redesigned."
```

#### Examples

```bash
# Feature (minor bump: 0.1.0 → 0.2.0)
git commit -m "feat: add dark mode toggle"
git commit -m "feat(auth): add social login with Google"

# Bug fix (patch bump: 0.1.0 → 0.1.1)
git commit -m "fix: resolve navigation menu overflow on mobile"
git commit -m "fix(api): handle null values in user profile"

# Performance improvement (patch bump)
git commit -m "perf: optimize image loading with lazy loading"

# No release
git commit -m "docs: update installation instructions"
git commit -m "chore: upgrade dependencies"
git commit -m "style: format code with prettier"
```

### Commit Message Validation

Husky and commitlint are configured to validate your commit messages. If your commit message doesn't follow the Conventional Commits format, the commit will be rejected with a helpful error message.

### Manual Versioning

In most cases, you don't need to manually update the version. However, if you need to force a specific version, you can do so using semantic-release's environment variables in the GitHub Actions workflow.

### Docker Images

Docker images are automatically built and published to [GitHub Container Registry](https://github.com/getsieutoc/voi/pkgs/container/voi) on every release.

#### Using Specific Versions

You can use specific versions in your docker-compose.yml:

```yaml
# Use latest version
image: ghcr.io/getsieutoc/voi:latest

# Use specific version
image: ghcr.io/getsieutoc/voi:v1.0.0
```

## Deploy with Docker

### Prerequisites

- Docker
- Docker Compose
- PostgreSQL 16+
- SMTP Credentials

### Setting up

#### Create docker-compose.yaml file

Create a `voi` folder and copy the minimal content of this template below:

```yaml
version: "3.8"
name: voi

services:
  postgres:
    container_name: voi-postgres
    image: postgres:16-alpine
    restart: always
    ports:
      - "5432:5432"
    volumes:
      - data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: postgresdb
      POSTGRES_USER: postgresuser
      POSTGRES_PASSWORD: yourpostgrespassword

  app:
    container_name: voi-app
    image: ghcr.io/getsieutoc/voi:latest
    restart: always
    ports:
      - "80:3000"
    environment:
      # Needed for authentication
      BETTER_AUTH_SECRET: topsecret
      BETTER_AUTH_URL: http://localhost

      # Connection string to the PostgreSQL database
      DATABASE_URL: postgres://postgresuser:yourpostgrespassword@db:5432/postgresdb

      # From which account e-mails will be sent
      EMAIL_FROM: hi@yourdomain.com

      SMTP_USER: username
      SMTP_PASSWORD: password
      SMTP_HOST: smtp.yourdomain.com
      SMTP_PORT: 587

      # Extra
      PROJECT_NAME: Voi

volumes:
  data:
```

The Docker Compose file above defines two services: `postgres` and `app`. In case you're using an external Postgres database, remove the db service and replace `DATABASE_URL` environment variable with your connection string.

#### Pull the images and run

Open your favorite terminal, navigate to `voi` folder and run

```bash
docker compose pull
docker compose up -d
```

You can find the logs by using `docker-compose logs app`. The message http server started on :3000 means everything is ok and you're ready to go.

Just open your favorite browser and navigate to <http://localhost>. You should see a `voi` app.

Congratulation! :tada: :tada:
