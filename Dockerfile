FROM node:16-alpine as builder
WORKDIR /app
COPY . .

RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install && yarn run build

ENTRYPOINT yarn run start
