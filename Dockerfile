# Build stage
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile
COPY . .
RUN pnpm tailwindcss -i ./src/views/input.css -o ./public/css/tailwind.css -m

# Production stage
FROM node:24-alpine AS production
WORKDIR /app

# Copy only production dependencies
COPY package*.json pnpm-lock.yaml ./

RUN apk add --no-cache curl
RUN corepack enable pnpm && pnpm i --prod --frozen-lockfile

# Copy built assets from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/drizzle.config.ts .

CMD ["pnpm", "tsx", "src/index.ts"]

