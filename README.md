# Component_store_Next_Gen
Its a component store for storing the components

## Setup and Run

### Setup

You need the following tools:

* docker
* docker-compose
* node + npm


Copy `.envrc.example` to `.envrc` and update the values as needed.
Afterwards perform a `direnv allow .` in your root folder.

### Database Setup

```bash
docker build -t componento:1.0 .
docker-compose up


You are now connected to database "componentstore" as user "componento".
```

The first time, you need to bootstrap the database. There is a script present, that will do that for you.
```bash
knex migrate:latest
```

Use `secret` as the password.

### For bootstraping database,use this command:

```bash
node ./bin/insert-data.js
```
## Startup

Start the application with:

```bash
cd component_store
nodemon src/app.js
```
## Tests

For Backend Tests:

You do have a database `component-store-test` as user `componento` and password `secret`.

```bash
cd component_store
npm test
```
For Frontend ( end to end ) Tests:

You do have a database `component-store-test` as user `componento` and password `secret`.
The test framework tests the frontend on the port `3006`.

```bash
cd component_store
npm run end2end
```

</br>Everytime you do 
```
docker-compose down -v
```
Also run
```bash
cd component_store
rm -R uploads/*

To make your uploads empty
```