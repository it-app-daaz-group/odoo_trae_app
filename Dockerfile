FROM node:20-bookworm-slim AS builder

WORKDIR /app

ENV NEXT_JSC_FORCE_WASM=1

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY . .

RUN mkdir -p public

RUN npm run build

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
ENV NEXT_JSC_FORCE_WASM=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3002
USER node

CMD ["node", "server.js"]
