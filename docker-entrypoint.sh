#!/bin/sh
set -e

echo "============================================================"
echo " Starting Bangalore Real Estate Portal (DPDP Act 2023)"
echo " Environment: ${NODE_ENV:-production}"
echo "============================================================"

# If DATABASE_URL is set, push Prisma schema and seed database
if [ -n "$DATABASE_URL" ]; then
  echo "=> Synchronizing PostgreSQL database schema..."
  npx prisma db push --skip-generate || echo "Warning: prisma db push encountered a non-fatal issue, continuing..."

  echo "=> Running statutory database seed (Bangalore RERA listings & admin)..."
  node prisma/seed.js || echo "Warning: Seed script already applied or non-fatal issue."
else
  echo "=> Warning: DATABASE_URL not supplied. Running in fallback mode."
fi

echo "=> Launching Next.js production server on port ${PORT:-3000}..."
exec node server.js

