#!/bin/sh

# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

# Seeding command
cd /node/app
npx prisma migrate deploy
npx prisma generate