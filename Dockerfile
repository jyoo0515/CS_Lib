FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ ./

ENV NODE_ENV=production

EXPOSE 5000
CMD [ "yarn", "start" ]