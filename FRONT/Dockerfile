FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./
RUN yarn install && yarn build

COPY . ./

EXPOSE 3000

CMD [ "yarn", "start" ]