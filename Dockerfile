FROM node:lts as build-stage
WORKDIR /app
RUN npm install -g typescript
COPY ./ ./
RUN yarn install
RUN yarn build

FROM node:lts as production-stage
EXPOSE $PORT
WORKDIR /app
RUN apt-get update && apt-get install -y net-tools
COPY package*.json ./
COPY yarn.lock ./
COPY .env ./
RUN cat .env
RUN mkdir dist
COPY --from=build-stage /app/dist ./dist/.
RUN yarn install --production
CMD ["yarn", "start"]