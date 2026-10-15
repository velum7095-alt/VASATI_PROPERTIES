# Coolify Deployment Guide

This guide details how to deploy the **Bangalore Real Estate DPDP-Compliant Platform** using [Coolify](https://coolify.io).

---

## Architecture Overview
- **Application:** Next.js 14 (Standalone output, multi-stage Docker build, non-root user `nextjs`).
- **Database:** PostgreSQL 16 (Persistent volume, automated healthcheck).
- **Security:** In-transit HSTS, AES-256-GCM field encryption at rest, salted SHA-256 IP hashing, TOTP 2FA.

---

## Deployment Option A: Docker Compose (Recommended)
This method spins up both the **Next.js application** and **PostgreSQL database** together with automatic networking and health checks.

1. In your Coolify dashboard, create a new **Project** or **Resource**.
2. Select **Docker Compose**.
3. Paste the contents of [`docker-compose.yml`](./docker-compose.yml).
4. Configure the environment variables in the Coolify UI (see [Environment Variables](#environment-variables)).
5. Click **Deploy**.
6. The container entrypoint will automatically:
   - Run `npx prisma db push` to synchronize the PostgreSQL database schema.
   - Run `node prisma/seed.js` to seed verified Bangalore RERA inventory and default administrator credentials.
   - Start the optimized production server on port `3000`.

---

## Deployment Option B: Standalone Dockerfile + Managed PostgreSQL
If you prefer running a separate managed PostgreSQL database in Coolify:

1. **Deploy Database:** In Coolify, create a **PostgreSQL** database service. Note the connection string.
2. **Deploy Application:** Connect your Git repository (GitHub / GitLab) and select **Dockerfile**.
3. Set the `DATABASE_URL` environment variable to point to your Coolify PostgreSQL instance.
4. Set the domains (e.g. `https://bangalore.yourdomain.com`).
5. Coolify will automatically provision an SSL certificate via Let's Encrypt with HTTP/2 and HSTS.

---

## Environment Variables

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection URL | `postgresql://user:pass@db:5432/dbname?schema=public` |
| `FIELD_ENCRYPTION_KEY` | 32-byte hex key for AES-256-GCM | `openssl rand -hex 32` |
| `IP_HASH_SALT` | Salt for SHA-256 IP hashing | `openssl rand -hex 16` |
| `ADMIN_SESSION_SECRET` | Secret for signing admin sessions | `openssl rand -hex 32` |
| `ADMIN_DEFAULT_EMAIL` | Default administrator email | `admin@example.com` |
| `ADMIN_DEFAULT_PASSWORD` | Default administrator password | `StrongSecretPass#2026` |
| `NEXT_PUBLIC_APP_URL` | Public production website URL | `https://bangalore.yourdomain.com` |
| `NEXT_PUBLIC_BUSINESS_NAME` | Business trade name | `[BUSINESS_NAME_PLACEHOLDER]` |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Registered Bangalore address | `[BUSINESS_ADDRESS_PLACEHOLDER]` |
| `NEXT_PUBLIC_AGENCY_KRERA_NO` | Karnataka RERA agency reg no. | `PRM/KA/RERA/1251/[YEAR]/AG/[NO]` |
| `NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME` | Grievance Officer name | `[GRIEVANCE_OFFICER_NAME_PLACEHOLDER]` |
| `NEXT_PUBLIC_GRIEVANCE_OFFICER_EMAIL`| Grievance Officer email | `grievance@yourdomain.in` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Official WhatsApp business phone | `916303420048` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key| `0x4AAAAAA...` (Optional) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key | `0x4AAAAAA...` (Optional) |

---

## Database Backups & Data Sovereignty
In accordance with Rule 5 of project requirements and DPDP Act 2023 best practices:
1. In the Coolify PostgreSQL settings, enable **Automated Daily Backups**.
2. Configure S3-compatible remote storage located in India (e.g. AWS `ap-south-1` Mumbai or GCP `asia-south1` Mumbai).
3. Set backup retention to **30 days**.

---

## Verification & Health Check
- The container includes a Docker health check:
  ```sh
  wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1
  ```
- Coolify monitors this endpoint to ensure zero-downtime rolling deploys.

