FROM node:erbium as builder

WORKDIR /app

ENV NODE_ENV production

ADD package.json . 

ADD yarn.lock . 

RUN yarn install

ADD . .

RUN yarn build

RUN yarn export

FROM nginx:1.17.5-alpine

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /usr/share/nginx/html/events/

COPY --from=builder /app/out/ /usr/share/nginx/html/events/