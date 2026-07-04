FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 4000

# Apply migrations on boot, then start the server.
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
