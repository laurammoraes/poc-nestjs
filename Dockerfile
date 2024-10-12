FROM node:18-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ARG APP_NAME
ENV NODE_ENV=${NODE_ENV}
ENV APP_NAME=${APP_NAME}
RUN apk add ffmpeg

COPY package*.json .npmrc ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
