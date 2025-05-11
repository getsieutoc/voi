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

- Next.js 14
- TypeScript
- ESLint
- Prettier
- Shadcn UI with Tailwind CSS
- Postgresql with Prisma
- Magic link login with Next-Auth

## Demo

https://voi.up.railway.app

## Getting Started

### One-click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/kJ5jtI?referralCode=pwTZMY)

> [!NOTE]
> Currently the Dockerfile does not work well, so the template still uses the GitHub as source. If you could help, please suggest me a way. Thanks in advance.

### Normal Installation

You need at least one Postgresql instance up and running.

Then you can deploy like a simple Next.js app, there are lot of tutorial on Vercel, Netlify etc.

The environment variables you need:

```
NEXTAUTH_SECRET=topsecret
NEXTAUTH_URL=https://yourdomain.com
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

#### Start developing!

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.

### Good to know

- This project uses `App Router` feature.
- We try to take adventage of Next.js's ecosystem, thus most of the features here are built on top of Next.js best practices.

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
    image: sieutoc/voi:latest
    restart: always
    ports:
      - "80:3000"
    environment:
      # Needed for authentication
      NEXTAUTH_SECRET: topsecret
      NEXTAUTH_URL: http://localhost:3000

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

```
docker compose pull
docker compose up -d
```

You can find the logs by using `docker-compose logs app`. The message http server started on :3000 means everything is ok and you're ready to go.

Just open your favorite browser and navigate to http://localhost. You should see a `voi` app.

Congratulation! :tada: :tada:
