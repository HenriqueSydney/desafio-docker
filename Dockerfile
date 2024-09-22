FROM node:20-alpine as base

FROM base as deps

WORKDIR /app

COPY . .

RUN npm ci
RUN npm audit fix

FROM base as builder

WORKDIR /app

COPY --from=deps --chown=app:node /app/package.json ./
COPY --from=deps --chown=app:node /app/package-lock.json ./
COPY --from=deps --chown=app:node /app/node_modules ./
COPY --from=deps --chown=app:node /app/prisma ./
COPY --from=deps --chown=app:node /app/src ./

RUN npm run build

FROM base as runner

WORKDIR /app

COPY --from=deps --chown=app:node /app/package.json ./
COPY --from=deps --chown=app:node /app/node_modules ./
COPY --from=deps --chown=app:node /app/prisma ./
COPY --from=builder --chown=app:node /app/build ./

EXPOSE 3000

CMD ["npm", "run", "start"]