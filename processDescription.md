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
  - Tools: PostgreSQL

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
programming.
