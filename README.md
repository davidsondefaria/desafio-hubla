# Setup in Localhost

For this project, I will be using Ubuntu 22.04. It can be similar to other unix
systems, just changing the package manager if necessary.

## Databases

I will be creating 2 instances, one called `desafio-dev` to be our main database
and another `desafio-test` to be used in our e2e tests.

### Creating a database instance

Considering that you already have PostgreSQL installed. If don't, follow the
instructions in this [link](https://www.postgresql.org/download/).

The access to database can be done by

```bash
sudo su - postgres          # to access the PostgreSQL
psql                        # to access the databases
```

We will create a new user `desafiouser` with admin permissions and password
`desafio-pass`.

```sql
create user desafio with superuser password 'desafio-pass'
```

Moving to pgAdmin4, which can be found and installed following this
[link](https://www.pgadmin.org/download/), we will add a new server and create
an instance using:

- Menu options: Object > Register > Server...
- Tab General: Set the server name as `hubla-test`.
- Tab Connection:
  - Host name: `localhost`
  - Port: 5432
  - Maintenance database: `postgres`
  - Username: `desafiouser`
  - Password: `desafio-pass`

After creating the server, open our new `hubla-test` server and create our two
database instances: `desafio-dev` and `desafio-test`. Make sure that the chosen
owner is `desafiouser` and we are finished. For this challenge, we don't need
advanced configurations.

## Backend

You can found the NestJS documentation in this [link](https://docs.nestjs.com/)
to learn and install the CLI.

With the CLI in hands, we started our boilerplate using `nest new backend`. But
you don't need to do this again, just have to install the dependencies and run
the server using:

```bash
yarn
yarn start:dev          # run development server in watch mode
```

You can find a deeper explanation in [NestJS readme](backend/README.md).

In another terminal session, you can also run the tests:

```bash
yarn test:watch           # run unit tests in watch mode

## OR

yarn test:e2e:watch       # run end to end tests in watch mode
```

And also, a good way to evaluate the test is see the coverage of it:

```bash
yarn test:cov
```

### Environment Variables

Env vars are useful to store data that can not be shared, so usually we don't
add into our git repositories. But for the sake of this project, we will share
both development and tests variables anyway, since there will be no data that
need to be secured.

So, both files `.env.development` and `.env.test` will make use of variables
that points to our dev and test databases. They become specially useful when we
setup our script in [package.json](backend/package.json) to run different
commands with the respective environments.

Also, as good practice, always maintain a file `.env.example` updated to show
what variables the project need to run.

## Frontend

TODO
