FROM node:14.17-alpine

RUN deluser --remove-home node \
  && addgroup -S node -g 1000 \
  && adduser -S -G node -u 1000 node


RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node . .

USER node

RUN yarn install && \
    yarn build

EXPOSE 8080

CMD ["yarn", "start:server"]