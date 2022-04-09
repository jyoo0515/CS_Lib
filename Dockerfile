FROM node:alpine
WORKDIR /app/client
COPY client/package*.json ./
RUN yarn install
COPY client/ ./
RUN yarn build

WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY ./ ./

ENV NODE_ENV=production

WORKDIR /app
EXPOSE 3000
CMD [ "yarn", "start:prod" ]