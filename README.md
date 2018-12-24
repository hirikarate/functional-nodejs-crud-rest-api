# Functional NodeJS CRUD RESTful API

An ExpressJS-based CRUD RESTful API service written in functional programming style

## INSTALLATION
- `npm i -g knex` or `yarn global add knex`
- `npm i` or `yarn i`

## AUTO-RECREATE DATABASE

This sample code uses database PostgreSQL, if you don't already have a PostgreSQL installation, you can quickly run a Docker container with this command:

- `docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:9.6-alpine`

You can either use [pgAdmin](https://www.pgadmin.org/download/) as the GUI Management tool for PostgreSQL, or use built-in Postgres command line.

You can change database connection detail in `_database/knexfile.js`

Log into PostgreSQL and create a database named `func-node` (if you don't change it in the `knexfile.js`)

Execute these commands in Terminal:
   - `cd _database`
   - `knex migrate:latest`