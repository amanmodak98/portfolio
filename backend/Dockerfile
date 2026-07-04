FROM node:20-alpine

WORKDIR /app

# Copy the Prisma schema before install so the postinstall
# `prisma generate` hook can find it.
COPY package*.json ./
COPY prisma ./prisma
RUN npm install --omit=dev

COPY . .

EXPOSE 4000

# Apply migrations on boot, then start the server.
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
