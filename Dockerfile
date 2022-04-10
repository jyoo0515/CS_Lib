FROM node:alpine AS builder
WORKDIR /app/client
COPY client/package*.json ./
RUN yarn install
COPY client/ ./
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/client/build /app/client/build
COPY package*.json ./
RUN yarn install
COPY ./ ./

ENV NODE_ENV=production

EXPOSE 5000
CMD [ "yarn", "start:prod" ]