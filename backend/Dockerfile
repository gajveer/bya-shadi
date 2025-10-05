# Stage 1 — Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Install deps (use npm ci for reproducible install)
COPY package*.json ./
RUN npm ci

# Copy source & build
COPY . .
RUN npm run build

# Stage 2 — Runtime (pinned immutable base image)
FROM node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e
WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built artifacts from builder (ensure your build emits to dist/)
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Switch to non-root user
USER appuser

EXPOSE 3001
CMD ["node", "dist/main.js"]
