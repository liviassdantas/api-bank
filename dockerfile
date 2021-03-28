FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm i -g @nestjs/cli

