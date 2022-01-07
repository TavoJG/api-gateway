# API Gateway

## Introduction

---

This is a very simple API Gateway based in ExpressJS.

## How to run

---

You need to execute those commands in your shell

```
git clone https://github.com/TavoJG/api-gateway.git
yarn install
```

This project use an _.env_ file to get some variables. Below is an example of this file:

```
NODE_ENV=
PORT= #Default 3000
SECRET_KEY= #JWT secret key
```

_.env_ file needs to be located at folder root. Then, you can run the project with `yarn dev`

## Configuring routes

---

Actually, the way to configure routes is in the file [routes_config.json](./config/routes_config.json). This is an array of objects with two properties:

- _path_: Url path to be called at gateway
- _baseUri_: Redirect Uri to microservice

## Tests

---

This project has some unit tests, implemented wit _Jest_. To run the test, type in your shell `yarn test` All the test are located on the folder [tests](./tests).

## Deploy

---

**Coming soon..**
