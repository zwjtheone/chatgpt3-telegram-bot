FROM node:16-alpine as builder
WORKDIR /app
COPY . .

RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install && yarn run build

FROM node:16-alpine as runner

WORKDIR /app

COPY --from=builder /app/dist ./
COPY --from=builder /app/package.json ./

RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install

ENTRYPOINT yarn run start
