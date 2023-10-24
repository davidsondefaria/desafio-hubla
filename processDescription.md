# Process Description

Since this is a challenge, I will describe here the way I'm thinking while doing
this project.

Some standards that I will try to follow:

- Break every requirement into small tasks.
- For each feature/component/class, a new branch.
- I will use
  [commit semantics](https://blog.geekhunter.com.br/o-que-e-commit-e-como-usar-commits-semanticos/).
- I will try to describe everything I do here, as much as I remember.
- _Maybe_ I will change something that I previously said, if I feel the need
  for.

## Breaking down the requirements

Since there is no tool specified to develop this project, I choose the ones that
I'm most familiar with:

- Frontend
  - Tools: React, Gatsby and ChakraUI
  - Atomic Design
- Backend
  - Tools: Typescript, NestJS and TypeORM
  - Test Driven Development
    - Jest and Supertest
    - Unit and e2e
  - Swagger
- Database
  - Tools: PostgreSQL and pgAdmin4

### Steps of developments

I will be splitting the development in some steps and each step in small tasks,
that can be found in [this file](tasks.md).

1. Setup
   - Backend NestJS with TypeORM
   - Database Postgres
   - Frontend React with Gatsby and ChakraUI
2. Backend
   1. POST _/transaction_: This endpoint should receive the file to be parsed.
   2. Parser: Create a method that receive the file, read and parse.
   3. GET _/transaction_: This endpoint should list all transactions.
   4. POST _/login_: This endpoint should allow users to access data.
3. Frontend
   1. Create a layout, nav bar, header and footer that sticks in every page
   2. Create a Transaction Page
      1. Create a modal with a form to accept a file.
      2. Create a list (a table maybe?) to show all transactions.
   3. Create a Dashboard Page with a information View:
      - Producer balance
      - Affiliate balance
   4. Authorization Page
      1. Login component
      2. Logout component
      3. Sign in component

For now, this is what I need to start. I will create small tasks and start
programming. Also, I will log the steps every time that I achieve a _mental_
milestone.

## Log 1: Setup

Well, I finished the setup. I used a branch named `setup-backend` and have
created everything that I need to start to develop the project, including
backend and frontend (_yep, forgot the branch name_).

With the setup done, I could merge our branch into our `desafio` branch, which
will be our development branch.

Also, created the documentation on how to install and setup the project on our
`README.md` file.

The next step will be to setup TypeORM and create our first resource
`transaction` in a new branch `transaction-feature`.

## Log 2: Transaction

I started adding the `transactions` resource, setting up unit and e2e tests and
creating the `Transaction` entity along with TypeORM decorators. Also, installed
Swagger to create our API documentation. I made some progress changing and
defining types and upgrading our API doc.

Although I chose TDD as development practice for this project, I started only
with e2e tests. So, I have created an environment to use a real database and
configured to use with TypeORM. With this config, the necessity of an test
service appeared to clean database and maybe it can be useful to create some
test queries too.

For our first endpoint, I have created two tests: one to match the perfect
condition and another to deal with bad requests. With these tests in hand, I
could finish the service dealing with file buffer, data transformation and bulk
insertion.

For the get endpoint, I have created a custom pagination by choice, instead
using from a NestJS or an external package and I made use of some decorators to
create a good API doc information.

After finishing the get one transaction by id endpoint, all main backend
features from transaction resource are done. I just need to create unit tests
for the methods, but I will back on this task later.

## Log 3: Auth

I started a new branch `auth-feature` to create everything about authentication
and authorization. I created the resource and wrote the sign in e2e test. In
this moment, I'm still wondering about login, if I use a body with plain email
and password, or email and a hashed password, or use a jwt. Plain email and
password are bad for security, but it's simple; In the other side, hashed
password or jwt are good for security, but maybe it's a premature optimization,
since I still didn't planned the auth in the front end side.

While developing auth endpoints, I realized the necessity of an User resource to
split the auth context and user context. The auth resource needs only to control
authentication and authorization, but it will use user service to write and read
users from database.

This new resource will also come in handy if there is a need of user control,
but, for now, I will only be using to access users though auth, so there is no
need for a controller for now.

As I said before, I implemented a new User resource while implementing Auth
feature. So now, auth service only has methods related to password hash and jwt,
which I will use later in a middleware. And for now, I will implement login
using just a plain email and password to make it simple.

I finished to implement login so I can return a valid JWT, store in the Frontend
(browser), and use it to check authorization via middlewares. Also, I realized
that I don't need a logout endpoint. And decided to start the Transaction Page
before finish the middleware, since maybe I will have to refactor some code.

## Log 4: Transaction Page

In order to make it simple, I will only create a page with a table, an insert
button and a header, and maintain the style really simple, but not _ugly_.

I have started the page development installing some dependencies that I will
use, setting up ChakraUI and creating the Header component. In this time, I
realized that my frontend fold have been considered as submodule all this time,
so, some commit have been lost. I changed the folder name to
`frontend-transaciton` and removed the old submodule. This problem happened
because I first started the project with a `.git` inside the frontend folder (I
forgot to remove when installed Gatsby).
