# Build phase
FROM node:18-alpine AS builder

# Accept environment variables at build time
ARG NEXT_PUBLIC_BACKEND_URL
ARG AUTH_URL

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV AUTH_URL=$AUTH_URL

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Run phase
FROM node:24-alpine
WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start"]