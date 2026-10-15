# Bangalore Real Estate Portal — DPDP Act 2023 & IT Act 2000 Compliant

A production-grade real estate web application focused exclusively on the Bengaluru (Karnataka) property market, engineered with a **Privacy-by-Design** architecture fully compliant with India's **Digital Personal Data Protection Act, 2023 (DPDP Act 2023)**, the **Information Technology Act, 2000 (IT Act 2000)**, and the **Real Estate (Regulation and Development) Act, 2016 (Karnataka RERA)**.

---

## 🏛️ Privacy & Regulatory Compliance Highlights

- **Unbundled Explicit Consent (DPDP § 6)**: Multi-language consent notices (**English**, **ಕನ್ನಡ - Kannada**, **हिन्दी - Hindi**) with version tracking (`v1.0-2026-03`). Zero pre-ticked checkboxes.
- **Field-Level AES-256-GCM Encryption**: All lead phone numbers and email addresses encrypted at rest with random IVs and authentication tags.
- **Blind HMAC Indexing**: Phone searchability via server-salted HMAC-SHA256 blind indexing without decrypting the table.
- **Pseudonymized IP Logging**: Salted SHA-256 IP hashing; client raw IP addresses are never persisted.
- **Self-Service DSR Portal (DPDP §§ 11–14)**: Dedicated user rights portal supporting real-time automated erasure, consent withdrawal, access requests, and 30-day statutory SLA tracking.
- **12-Month Inactivity Auto-Anonymization (DPDP § 8(7))**: Inactive leads irreversibly anonymized after 12 months with immutable consent archive.
- **Privacy-First Cookie Gatekeeper**: 3-tier cookie banner (*Accept All*, *Reject Non-Essential*, *Customize*) with Do Not Track (DNT) header support and zero third-party ad network tracking.
- **Karnataka RERA Mandate (RERA § 11(2))**: Enforces verified Karnataka RERA registration numbers (`PRM/KA/RERA/...`) on every property listing and footer.
- **Protected 2FA Admin CMS**: Hidden admin portal (`/admin`) requiring bcrypt authentication, TOTP 2FA (RFC 6238), and immutable audit logs (`AdminAuditLog`) for every decrypted PII access.
- **Containerized & Self-Hosted**: Production multi-stage Alpine Docker container ready for 1-click deployment on Coolify.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Standalone Output) + TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & ORM**: PostgreSQL + [Prisma ORM](https://www.prisma.io/)
- **Security & Bot Defense**: Cloudflare Turnstile CAPTCHA + In-Memory Sliding-Window Rate Limiting + Strict Security Headers (CSP, HSTS, X-Frame-Options)
- **Deployment**: Docker + Docker Compose + [Coolify](https://coolify.io/)

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ (tested on Node v20 & v22)
- PostgreSQL database (local or Docker container)

### 2. Clone & Install Dependencies
```bash
git clone <repository-url>
cd NRN_PROPERTIES_WEBSITE
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Generate secure 32-byte hex keys:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Populate `FIELD_ENCRYPTION_KEY`, `ADMIN_SESSION_SECRET`, and `IP_HASH_SALT` in `.env`.

### 4. Setup Database
Push Prisma schema and seed initial Bangalore properties & admin credentials:
```bash
npx prisma db push
node prisma/seed.js
```

Default seeded administrator:
- **Email**: `admin@example.com`
- **Password**: `Admin#2026!Secure` (Change immediately upon deployment!)

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 🐳 Docker & Coolify Production Deployment

For complete Coolify and Docker Compose deployment instructions, refer to [COOLIFY.md](file:///d:/Urdigix_Projects/NRN_PROPERTIES_WEBSITE/COOLIFY.md).

### Quick Docker Compose Spin-up:
```bash
docker compose up -d --build
```
This boots both the PostgreSQL 16 database and the optimized Next.js standalone container.

---

## 📚 Compliance & Legal Documentation

Comprehensive regulatory analysis, statutory mapping, and incident response playbooks are documented in:
- [COMPLIANCE.md](file:///d:/Urdigix_Projects/NRN_PROPERTIES_WEBSITE/COMPLIANCE.md): Complete DPDP Act 2023, IT Act 2000, and Karnataka RERA mapping matrix.
- [COOLIFY.md](file:///d:/Urdigix_Projects/NRN_PROPERTIES_WEBSITE/COOLIFY.md): Hosting, backup, and Indian data center deployment guide.

---

## 📁 Project Architecture

```
NRN_PROPERTIES_WEBSITE/
├── prisma/
│   ├── schema.prisma            # Models for Property, Lead, ConsentLog, DSR, Admin, AuditLog
│   └── seed.js                  # Seed data for Bangalore corridors & admin credentials
├── src/
│   ├── app/
│   │   ├── page.tsx             # Home page with hero carousel & featured listings
│   │   ├── listings/            # Bangalore corridor filter & property search
│   │   ├── properties/[slug]/   # Property detail page with EMI calculator & enquiry form
│   │   ├── about/               # Bangalore advisory & RERA mandate overview
│   │   ├── contact/             # Contact page with Grievance Officer card
│   │   ├── privacy/             # DPDP Act & IT Act compliant Privacy Policy
│   │   ├── terms/               # Terms of Service & dispute resolution under Karnataka law
│   │   ├── cookies/             # Technical Cookie Policy & cookie table
│   │   ├── grievance/           # Statutory 3-tier Grievance Redressal mechanism
│   │   ├── user-rights/         # Self-service DSR portal & SLA tracker
│   │   ├── admin/               # Hidden 2FA-secured compliance & property CMS
│   │   │   └── login/           # Two-stage credential + TOTP login
│   │   └── api/                 # Secure REST API endpoints (leads, DSR, admin, consent)
│   ├── components/              # UI components (CookieBanner, ConsentNoticeBox, etc.)
│   ├── lib/                     # Cryptography, auth, rate limiting, and business logic
│   └── middleware.ts            # Security headers & admin route protection
├── Dockerfile                   # Multi-stage Alpine container (standalone output)
├── docker-compose.yml           # App + PostgreSQL 16 stack
├── docker-entrypoint.sh         # Container migration & startup script
├── COOLIFY.md                   # Coolify deployment documentation
├── COMPLIANCE.md                # Statutory compliance mapping matrix
└── README.md                    # Project documentation
```

---

## ⚖️ Disclaimer
All legal texts, policy terms, and consent notices provided in this repository are drafts for informational purposes and must be verified by a licensed advocate enrolled with the Bar Council of India prior to public deployment.
