FROM node:16-alpine

WORKDIR /app/back

COPY . ./
RUN yarn install && yarn build

COPY . ./

EXPOSE 5000

CMD [ "yarn", "dev" ]