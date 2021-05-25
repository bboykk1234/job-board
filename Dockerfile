FROM node:14.17-alpine AS base
ARG PORT
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN mkdir -p /usr/src/app
RUN chown node:node -R /usr/src/app

WORKDIR /usr/src/app

FROM base AS dev
USER node

FROM base AS prod
COPY --chown=node:node . .
USER node

RUN yarn install && \
    yarn build