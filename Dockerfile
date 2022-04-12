FROM node:alpine
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY ./ ./

ENV NODE_ENV=production

EXPOSE 5000
CMD [ "yarn", "start" ]