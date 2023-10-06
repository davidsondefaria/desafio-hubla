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
