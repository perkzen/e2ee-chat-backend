<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Backend server for end-2-end encryption chat messaging app. Main technologies used for this project are Nest.js,
Postgres and socket.io

## Installation

Node packages

```bash
$ npm install
```

Postgres DB

 ```bash
$ docker-compose up
$ prisma generate
$ prisma db pull
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

