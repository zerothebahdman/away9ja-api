# Away Naija

## Requirements

1. Node 17 and above
2. NPM
3. Docker
4. MongoDB

## Project Installation

1. `cd` into whatever directory you want work from.
2. Run `git clone https://github.com/Tratrust-Limited/PG-BACK-OFFICE-API.git` then `cd` into the repo.
3. After cloning the project, run `cp .env .env.example` on your terminal to create a new `.env` file from the `.env.example`.
4. Run `yarn install` to install all the dependencies.
5. Run `yarn dev` to start the project in development mode.
6. Run `yarn build` to build the project for production.
7. Run `yarn start` to start the project in production mode.

## Project Setup

1. Create a database on your machine.

- For **PostgreSQL**
  - Navigate into `src/database/prisma/schema.prisma` verify that inside the datasource db object provider is set to mysql i.e `provider = "postgresql"`

```bash
Your database url in the `.env` file should as follows

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

mydb : The name of the databse you created on your machine
johndoe : The username of the database
randompassword : The password of the database
```

- To migrate the database tables from prisma use `npx prisma migrate dev --name init --schema=./src/database/prisma/schema.prisma`
- To view your database on your browser use prisma studio `npx prisma studio --schema=./src/database/prisma/schema.prisma`

  ***

**Note**
If you have discovered a bug or have a feature suggestion, feel free to create an issue on [Github](https://github.com/codewithdiv/nodejs-boilerplate/issues).

## Making contributions

[Checkout the contributions guidelines](https://github.com/codewithdiv/nodejs-boilerplate/blob/main/CONTRIBUTION.md)

Dont forget to star or fork this if you like it

### License

[![license](https://img.shields.io/badge/license-GPL-4dc71f.svg)](https://github.com/codewithdiv/nodejs-boilerplate/blob/main/LICENCE)

This project is licensed under the terms of the [GPL license](/LICENSE).

```

```
