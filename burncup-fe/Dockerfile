# Build phase
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
COPY .env.local .env.local
RUN npm run build

# Run phase
FROM node:24-alpine
WORKDIR /app

COPY --from=builder /app ./
COPY --from=builder /app/.env.local .env.local

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start"]