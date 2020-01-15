FROM node:erbium-slim as builder

WORKDIR /app

ENV NODE_ENV production

ADD package.json . 

ADD yarn.lock . 

RUN yarn install

ADD . .

RUN yarn build

FROM node:erbium-slim

WORKDIR /app

ADD package.json . 

COPY --from=builder /app/.next /app/.next

ADD package.json . 

ADD yarn.lock . 

RUN yarn install

CMD ["yarn", "start"]

