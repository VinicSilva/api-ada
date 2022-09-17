FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
COPY package-lock.json ./
RUN yarn install && yarn build

COPY . ./

EXPOSE 3000

CMD [ "yarn", "start" ]