FROM node:erbium as builder

WORKDIR /app

ADD package.json . 
ADD yarn.lock . 
RUN yarn install

ENV NODE_ENV production

ADD . .
RUN yarn build

FROM nginx:1.17-alpine

COPY --from=builder /app/out/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/nginx.conf
