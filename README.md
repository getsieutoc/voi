<h1 align="center">
 <img src="https://i.imgur.com/Xohapcq.png" title="voi logo" />
</h1>

<p align="center">Made by ⚡Sieutoc</p>

<p align="center" width="100%">
    <img src="https://github.com/websitesieutoc/voi/assets/1083478/7afcc2d3-0a2b-4bc8-acb8-42f99ded4bdd" />
</p>

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

> [!IMPORTANT]
> Work in progress, breaking changes are expected!

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

### Create New Component

We use [shadcn-ui](https://ui.shadcn.com/) in this stack, and create 2 helper scripts for you:

```bash
# for adding new component
pnpm ui:add <compnent-name>

# for checking diffs
pnpm ui:diff <component-name>
```

#### Start developing!

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.

## Good to know

- This project uses `App Router` feature.
- We try to take adventage of Next.js's ecosystem, thus most of the features here are built on top of Next.js best practices.
