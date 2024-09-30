FROM node:20-alpine AS base

FROM base AS deps

WORKDIR /app

COPY . .

RUN npm ci

FROM base AS builder

WORKDIR /app

COPY --from=deps --chown=app:node /app/package.json ./
COPY --from=deps --chown=app:node /app/package-lock.json ./
COPY --from=deps --chown=app:node /app/tsconfig.json ./
COPY --from=deps --chown=app:node /app/node_modules ./node_modules
COPY --from=deps --chown=app:node /app/prisma ./prisma
COPY --from=deps --chown=app:node /app/src ./src

RUN npm install

RUN npm run build

FROM base AS runner

WORKDIR /app

COPY --from=deps --chown=app:node /app/package.json ./
COPY --from=deps --chown=app:node /app/node_modules ./node_modules
COPY --from=deps --chown=app:node /app/prisma ./prisma
COPY --from=builder --chown=app:node /app/build ./build

EXPOSE 3000

CMD ["npm", "run", "start"]