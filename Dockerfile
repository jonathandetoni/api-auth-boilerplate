FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
COPY tsconfig*.json ./
COPY ./src ./src
COPY ./prisma ./prisma

RUN yarn install && \
    yarn build 
RUN npx prisma generate

ARG NODE_ENV

EXPOSE 8080

CMD ["yarn","start"]